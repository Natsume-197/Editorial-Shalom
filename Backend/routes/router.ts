// Libraries
import express from 'express'
// Middlewares
import { isAuth } from '../middleware/isAuth'
import { isAuthAdmin } from '../middleware/isAuthAdmin'

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
import { uploadCoverBook, createBook, searchBooks, findBook, getCategories } from '../controllers/bookController'

export const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'assets/books/covers' })

// Public Routes
router.post('/register', signUp)
router.post('/login', logIn)

// Account Functions
router.get('/account/verify/:token', verifyUser)
router.post('/account/resetpassword', sendResetPassword)
router.post('/account/resetpassword/:token', setNewPassword)

// Book Related Functions
router.get('/search', searchBooks)
router.get('/book/category', getCategories)
router.post('/book/upload/cover', upload.single('image'), uploadCoverBook)

// User CRUD Routes
router.get('/user', isAuthAdmin, getAllUsers)
router.get('/user/:id',isAuthAdmin, getUser)
router.patch('/user/:id', isAuthAdmin, updateUser)
router.delete('/user/:id', isAuthAdmin, deleteUser)

// Book CRUD Routes
router.get('/book/:id', findBook)
router.post('/book', isAuthAdmin, createBook)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuthAdmin, authPage)
