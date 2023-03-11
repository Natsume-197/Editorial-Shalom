// @ts-ignore
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
import { createBook, searchBooks, findBook, getCategories, getAllBooks } from '../controllers/bookController'
import { createReceipt, searchBooksReserved, getStatus, getAllRequestSale, findRequestSale, createRequestSale,updateRequestSale } from '../controllers/shopController'

export const router = express.Router()
const path = require('path');

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (_req: any, file: { mimetype: string }, cb: (arg0: null, arg1: string) => void) {
    let uploadPath = './assets/books';
    if (file.mimetype === 'application/pdf') {
      uploadPath = path.join(uploadPath, 'previews');
    } else if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'covers');
    }
    cb(null, uploadPath);
  },
  filename: function (_req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });
// diskStorage receipt
const storageR = multer.diskStorage({
  destination: function (_req: any, file: { mimetype: string }, cb: (arg0: null, arg1: string) => void) {
    let uploadPath = './assets/shops';
    if (file.mimetype === 'application/pdf') {
      uploadPath = path.join(uploadPath, 'file_receipts');
    } else if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'file_receipts');
    }
    cb(null, uploadPath);
  },
  filename: function (_req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const uploadR = multer({ storageR: storageR });

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
router.get('/book', getAllBooks)
router.get('/book/:id', findBook)
router.post('/book', isAuthAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createBook)

// Shops Related Functions
router.get('/searchReserved', searchBooksReserved)
router.get('/sales_request/status', getStatus)

// Shops CRUD Routes
router.get('/sales_request',isAuthAdmin, getAllRequestSale)
router.get('/sales_request/:id',isAuthAdmin, findRequestSale)
router.post('/sales_request', createRequestSale)
router.patch('/sales_request/:id', isAuthAdmin, updateRequestSale)
router.post('/sales_request/receipt', uploadR.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createReceipt)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuthAdmin, authPage)


