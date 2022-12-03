// Libraries
import express from 'express'
// Middlewares
import { isAuth } from '../middleware/isAuth'
// Controllers
import { authPage, logIn, logout, signUp, verifyUser, getAllUsers, getUser, updateUser, deleteUser} from '../controllers/userController'

export const router = express.Router()

// Public Routes
router.post('/register', signUp)
router.post('/login', logIn)
router.get('/account/verify/:token', verifyUser)

// User CRUD routes
router.get('/user', getAllUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuth, authPage)