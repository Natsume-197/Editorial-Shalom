import { Sequelize } from 'sequelize-typescript'

import { User } from '../models/users/user'
import { Role } from '../models/users/role'
import { Book } from '../models/books/book'
import { Book_t } from '../models/books/book_t'
import { Language } from '../models/books/language'
import { User_role } from '../models/users/user_role'

require('dotenv').config()

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  models: [User, Role, User_role, Book, Language, Book_t],
  logging: false
})

export default connection
