import { Sequelize } from 'sequelize-typescript'

import { User } from '../models/users/user'
import { Role } from '../models/users/role'
import { Book } from '../models/books/book'
import { Book_t } from '../models/books/book_t'
import { Language } from '../models/books/language'
import { User_role } from '../models/users/user_role'
import { Category } from '../models/books/category'
import { Book_reserved } from '../models/shops/book_reserved'
import { Sale_request } from '../models/shops/sales_request'
import { Status } from '../models/shops/status'
import { Receipt } from '../models/shops/receipt'
import { Request_message } from '../models/shops/request_message'

require('dotenv').config()

const connection = new Sequelize({
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  dialect: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  models: [User, Role, User_role, Book, Language, Book_t, Category, Book_reserved, Status, Receipt, Request_message, Sale_request],
  logging: false
})

export default connection
