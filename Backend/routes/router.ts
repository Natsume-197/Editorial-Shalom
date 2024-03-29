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
  setNewPassword,
  activeUser,
  updateUserforUser
} from '../controllers/userController'
import { createBook, searchBooks, findBook, getCategories, getAllBooks, updateBook, inactiveBook, activeBook } from '../controllers/bookController'
import { createReceipt,
   searchBooksReserved,
   getStatus, 
   getAllRequestSale, 
   findRequestSale, 
   createRequestSale,
   updateRequestSale, 
   getAllRequestSaleForUser, 
   addMessage,
   getAllMessageForRequestSale,
   getAllRequestSaleForStatus,
   updateMessage
  } from '../controllers/shopController'

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
router.get('/user/:id',isAuth, getUser)
router.patch('/user/:id', isAuth, updateUser)
router.patch('/userforuser/:id', updateUserforUser)
router.patch('/deleteuser/:id', isAuth, deleteUser)
router.patch('/activeuser/:id', isAuthAdmin, activeUser)

// Book CRUD Routes
router.get('/book', getAllBooks)
router.get('/book/:id', findBook)
router.post('/book', isAuthAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createBook)
router.patch('/book/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateBook)
router.patch('/activeBook/:id', activeBook)
router.patch('/inactiveBook/:id', inactiveBook)


// Shops Related Functions
router.get('/searchReserved/:id', searchBooksReserved)
router.get('/sales_request/status', getStatus)
router.post('/sales_request/addMessage', addMessage)
router.get('/sales_request/message/:id', getAllMessageForRequestSale)

// Shops CRUD Routes
router.get('/sales_request_get', getAllRequestSale)
router.get('/sales_request_user/:id', getAllRequestSaleForUser)
router.get('/sales_request_status/:id', getAllRequestSaleForStatus)
router.get('/sales_request_find/:id', findRequestSale)
router.post('/sales_request', createRequestSale)
router.patch('/sales_request_update/:id', updateRequestSale)
router.post('/sales_request/receipt', uploadR.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createReceipt)
router.patch('/sales_request/update_message',updateMessage)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuthAdmin, authPage)


