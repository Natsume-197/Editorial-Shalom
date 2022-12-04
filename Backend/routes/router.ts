// Libraries
import express from 'express'
// Middlewares
import { isAuth } from '../middleware/isAuth'
// Controllers
import {
  authPage,
  logIn,
  logout,
  signUp,
  verifyUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  sendResetPassword,
  setNewPassword
} from '../controllers/userController'
import { createBook, searchBooks } from '../controllers/bookController'

export const router = express.Router()

// Public Routes
router.post('/register', signUp)
router.post('/login', logIn)

// Account Functions
router.get('/account/verify/:token', verifyUser)
router.post('/account/resetpassword', sendResetPassword)
router.post('/account/resetpassword/:token', setNewPassword)

// Book Related Functions
router.get('/search', searchBooks)

// User CRUD Routes
router.get('/user', getAllUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Book CRUD Routes
router.post('/book', createBook)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuth, authPage)
