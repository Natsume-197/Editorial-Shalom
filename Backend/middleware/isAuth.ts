import { Authorized, BadRequest } from '../utils/error'
import { Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// Check the user if is Authenticated
export const isAuth = (req: any, res: Response, next: NextFunction): void => {
  const authHeader: string | undefined = req.headers['cookie']
  const token = authHeader ? authHeader && authHeader.split('=')[1] : ''
  
  if (!token){
    res.clearCookie('access_token')
    throw new Authorized('No hay token...')
  }
    
  try {
    const jwtSecretKey: string = process.env.SECRET_KEY ? process.env.SECRET_KEY : ''
    const decoded = jwt.verify(token, jwtSecretKey)
    req.user = decoded

    // Role validation
    console.log(decoded)


    return next()
  } catch (error) {
    //next(error)
    if (error.message === 'jwt expired') {
      res.clearCookie('access_token')
      throw new BadRequest('El token JWT ha expirado. Se ha cerrado la sesión.')
    } else {
      res.clearCookie('access_token')
      throw new Authorized('Token invalido... Se ha cerrado la sesión.')
    }
  }
  



}


