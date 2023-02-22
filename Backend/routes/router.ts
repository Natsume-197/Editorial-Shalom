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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'assets/books';
    if (file.mimetype === 'application/pdf') {
      uploadPath = path.join(uploadPath, 'previews');
    } else if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'covers');
    }
    cb(null, uploadPath);
  },
  /* Añadir nombre
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },*/
});const path = require('path');

const upload = multer({ storage: storage });


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

// User CRUD Routes
router.get('/user', isAuthAdmin, getAllUsers)
router.get('/user/:id',isAuthAdmin, getUser)
router.patch('/user/:id', isAuthAdmin, updateUser)
router.delete('/user/:id', isAuthAdmin, deleteUser)

// Book CRUD Routes
router.get('/book/:id', findBook)
router.post('/book', isAuthAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createBook)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuthAdmin, authPage)
