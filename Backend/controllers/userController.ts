import { Authorized, BadRequest, Conflict, NotFound } from '../utils/error'
import { createToken, maxAge } from '../middleware/createToken'
import { Request, Response, NextFunction } from 'express'
import { userData } from '../validation/validation'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import axios from 'axios'
var jwt = require('jsonwebtoken')

import { sendConfirmationEmail, sendResetPasswordEmail } from '../services/mailService'
import { User } from '../models/users/user'
import { User_role } from '../models/users/user_role'
import { Role } from '../models/users/role'

// Only auth Users can access this page
export const authPage = (_req: Request, res: Response): object => {
  return res.status(StatusCodes.OK).json({
    message: 'Usuario autenticado'
  })
}

// Sign up Page
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.recaptcha)
      throw new BadRequest('Debe resolver el captcha primero para poder registrarse')

    const urlGoogleVerification = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_GOOGLE}&response=${req.body.recaptcha}`

    const responseGoogleCaptcha = await axios.post(urlGoogleVerification, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    })

    if (!responseGoogleCaptcha.data.success)
      throw new BadRequest('Captcha no válido. Intentelo nuevamente en unos minutos.')

    // Validation User Input
    // const { error } = userData.validate(req.body)
    console.log(req.body)
    //if (error) throw new BadRequest(error.details[0].message)

    // read from body
    const { name, second_name, email, password, address, cellphone, is_verified, is_admin } =
      req.body

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

      const roles = [1]
      if (is_admin) {
        roles.push(2)
      }
      const userRoles = roles.map(roleId => ({ id_role: roleId }))

      if (is_verified === true) {
        const user = await User.create(
          {
            name: name,
            second_name: second_name,
            address: address,
            email: email.toLowerCase(),
            password: encryptedPassword,
            cellphone: cellphone,
            email_token: randomTokenEmail,
            is_verified: true,
            is_active: true,
            user_roles: userRoles
          },
          { include: User_role }
        )

        await user.save()

        return res.status(StatusCodes.CREATED).json({
          message: `Se ha creado el usuario: '${req.body.name}' de forma exitosa.`,
          user: user
        })

      } else {
        const userRoles = roles.map(roleId => ({ id_role: roleId }))

        const user = await User.create(
          {
            name: name,
            second_name: second_name,
            address: address,
            email: email.toLowerCase(),
            password: encryptedPassword,
            cellphone: cellphone,
            email_token: randomTokenEmail,
            is_verified: false,
            is_active: true,
            user_roles: userRoles
          },
          { include: User_role }
        )
        // Send verification email to user
        await sendConfirmationEmail(name, email.toLowerCase(), randomTokenEmail)
        await user.save()

        // Response
        return res.status(StatusCodes.CREATED).json({
          message: `Se ha creado el usuario: '${req.body.name}' de forma exitosa.`,
          user: user
        })
      }
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
      where: { email: req.body.email },
      include: User_role
    })

    console.log(user)


    if (!user) throw new NotFound('Este correo no se encuentra registrado...')
    if (!user.is_active) throw new NotFound('Este usuario no se encuentra activo...')

    // Compare the passwords
    const password: boolean = await bcrypt.compare(req.body.password, user.password)
    if (!password) throw new BadRequest('Correo o contraseña incorrecta...')

    if (user.is_verified === false)
      throw new Authorized('El correo no ha sido verificado. Revise su correo eléctronico.')

    const urlGoogleVerification = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_GOOGLE}&response=${req.body.recaptcha}`

    const responseGoogleCaptcha = await axios.post(urlGoogleVerification, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    })

    if (!responseGoogleCaptcha.data.success)
      throw new BadRequest('Captcha no válido. Intentelo nuevamente en unos minutos.')

    // Create Token with role permissions
    const user_role = await User_role.findAll({
      where: { id_user: user.id },
      include: [
        {
          model: Role,
          required: true
        }
      ]
    })

    const list_roles = user_role.map(user_role => user_role.id_role)

    const token = createToken(user.id, list_roles)
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
      sameSite: 'none'
    })

    const data_user = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user?.user_roles
    }

    // Response
    return res.status(StatusCodes.OK).json({
      message: `Ha iniciado sesión, ${user.name}`,
      user: data_user,
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
      where: { email_token: req.params.token }
    })

    // Check if there is any user with the url token
    if (!user) throw new NotFound('Token no válido...')

    // Check if user is already verified
    if (user.is_verified === true)
      throw new Conflict('Este correo ya se encuentra verificado. Inicie sesión con normalidad.')

    user.is_verified = true
    await user.save()

    return res.status(StatusCodes.ACCEPTED).json({
      message: 'Se ha verificado el correo.'
    })
  } catch (error) {
    return next(error)
  }
}

export const sendResetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find user
    const user = await User.findOne({
      where: { email: req.body.email }
    })
    if (!user) throw new NotFound('Correo no encontrado. Verifique nuevamente.')

    // Generate random reset password token
    const jwtSecretKey: string = process.env.SECRET_KEY ? process.env.SECRET_KEY : ''
    const resetToken: string = jwt.sign({ email: req.body.email }, jwtSecretKey)

    // Update user
    user.password_token = resetToken
    await user.save()

    // Send reset password email to user
    await sendResetPasswordEmail(user.name, user.email, resetToken)

    // Response
    return res.status(StatusCodes.OK).json({
      message: `Se ha enviado un correo electrónico para reestablecer la contraseña: '${user.email}'.`,
      user: user
    })
  } catch (error) {
    return next(error)
  }
}

export const setNewPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate User Input
    //const { error } = passwordData.validate(req.body)
    //if (error) throw new BadRequest(error.details[0].message)

    // Find user
    const user = await User.findOne({
      where: { password_token: req.params.token }
    })

    if (!user) throw new NotFound('Token de recuperación de contraseña no válido')

    if (!req.body.password && user) {
      return res.status(StatusCodes.OK).json({
        message: `El token es válido.`
      })
    } else {
      // Encrypt the password
      const salt: string = await bcrypt.genSalt(10)
      const encryptedPassword: string = await bcrypt.hash(req.body.password, salt)

      // Update user
      user.password = encryptedPassword
      user.password_token = ''
      await user.save()

      // Response
      return res.status(StatusCodes.OK).json({
        message: `La contraseña del correo: '${user.email}' se ha reestablecido de forma exitosa.`,
        user: user
      })
    }
  } catch (error) {
    return next(error)
  }
}

// CRUD Functions

// Get all users
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll()
    return res.status(StatusCodes.OK).json({
      message: 'Usuarios encontrados',
      users: users
    })
  } catch (error) {
    return next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user exists
    const user = await User.findOne({
      where: { id: req.params.id }
    })

    if (!user) throw new NotFound('Este usuario no existe...')

    // Response
    return res.status(StatusCodes.OK).json({
      message: 'Usuario encontrado',
      user: user
    })
  } catch (error) {
    return next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find user
    const user = await User.findByPk(req.params.id)
    if (!user) throw new NotFound('Usuario no encontrado')

    // Update user
    if (req.body.name) user.name = req.body.name
    if (req.body.email) user.email = req.body.email
    if (req.body.password) user.password = req.body.password

    await user.save()

    // Response
    return res.status(StatusCodes.OK).json({
      message: `Se ha actualizado el usuario: '${user.name}' de forma exitosa.`,
      user: user
    })
  } catch (error) {
    return next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user exists
    const user = await User.findOne({
      where: { id: req.params.id }
    })

    if (!user) throw new NotFound('Este usuario no existe...')
    user.is_active = false
    // Delete user
    await user.save()

    // Response
    return res.status(StatusCodes.OK).json({
      message: `Se ha desactivado el usuario de forma exitosa.`
    })
  } catch (error) {
    return next(error)
  }
}

  export const activeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists
      const user = await User.findOne({
        where: { id: req.params.id }
      })
  
      if (!user) throw new NotFound('Este usuario no existe...')
      user.is_active = true
      // Delete user
      await user.save()
  
      // Response
      return res.status(StatusCodes.OK).json({
        message: `Se ha desactivado el usuario de forma exitosa.`
      })
    } catch (error) {
      return next(error)
    }
}

