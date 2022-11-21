// Libraries
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import axios from 'axios'
var jwt = require('jsonwebtoken')
// Models
import { User } from '../models/user'
// Validation
import { userData } from '../validation/validation'
// Middlewares
import { createToken, maxAge } from '../middleware/createToken'
// Error Handler
import { Authorized, BadRequest, Conflict, NotFound } from '../utils/error'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'
// Email
import sendConfirmationEmail from '../services/mailService'

// Only auth Users can access this page
export const authPage = (_req: Request, res: Response): object => {
  return res.status(StatusCodes.OK).json({
    message: 'Usuario autenticado'
  })
}

// Sign up Page
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation User Input
    const { error } = userData.validate(req.body)
    console.log(req.body)
    if (error) throw new BadRequest(error.details[0].message)

    // read from body
    const { name, email, password } = req.body

    // check if user already exists
    const oldUser = await User.findOne({
      where: { email: email }
    })

    if (oldUser) {
      throw new Conflict('Este correo ya está en uso...')
    } else {
      // encrypt the password
      const salt: string = await bcrypt.genSalt(10)
      const encryptedPassword: string = await bcrypt.hash(password, salt)

      // Generate random email verification token
      const jwtSecretKey: string = process.env.SECRET_KEY ? process.env.SECRET_KEY : ''
      const randomTokenEmail: string = jwt.sign({ email: email }, jwtSecretKey)

      // create user
      const user = await User.create({
        name: name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        confirmationToken: randomTokenEmail
      })

      // Send verification email to user
      await sendConfirmationEmail(name, email.toLowerCase(), randomTokenEmail)

      // Save the User
      await user.save()

      // Response
      return res.status(StatusCodes.CREATED).json({
        message: `Se ha creado el usuario: '${req.body.name}' de forma exitosa.`,
        user: user
      })
    }
  } catch (error) {
    return next(error)
  }
}

// Login Page
export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if captcha is correct
    if (!req.body.recaptcha)
      throw new BadRequest('Debe resolver el captcha primero para poder iniciar sesión')

    // Check if user already exists
    const user = await User.findOne({
      where: { email: req.body.email }
    })

    if (!user) throw new NotFound('Este correo no se encuentra registrado...')

    // Compare the passwords
    const password: boolean = await bcrypt.compare(req.body.password, user.password)
    if (!password) throw new BadRequest('Correo o contraseña incorrecta...')

    if (user.isVerified === false)
      throw new Authorized('El correo no ha sido verificado. Revise su correo eléctronico.')

    const urlGoogleVerification = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_GOOGLE}&response=${req.body.recaptcha}`

    const responseGoogleCaptcha = await axios.post(urlGoogleVerification, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    })

    if (!responseGoogleCaptcha.data.success)
      throw new BadRequest('Captcha no válido. Intentelo nuevamente en unos minutos.')

    // Create Token
    const token = createToken(user.id)
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
      sameSite: 'none'
    })

    // Response
    return res.status(StatusCodes.OK).json({
      message: `Bienvenido ${user.name}!`,
      user: user,
      token: token
    })
  } catch (error) {
    return next(error)
  }
}

// Logout User
export const logout = (_req: Request, res: Response, _next: NextFunction) => {
  return res.clearCookie('access_token').status(StatusCodes.OK).json({
    status: res.status,
    message: 'Se ha cerrado la sesión'
  })
}

// Verify User Email
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: { confirmationToken: req.params.token }
    })

    // Check if there is any user with the url token
    if (!user) throw new NotFound('Token no válido...')

    // Check if user is already verified
    if (user.isVerified === true)
      throw new Conflict('Este correo ya se encuentra verificado. Inicie sesión con normalidad.')

    user.isVerified = true
    await user.save()

    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Se ha verificado el correo.'
    })
  } catch (error) {
    return next(error)
  }
}
