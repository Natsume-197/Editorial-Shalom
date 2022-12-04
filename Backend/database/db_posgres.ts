import { Sequelize } from 'sequelize-typescript'

// Models
import { User } from '../models/users/user'
import { Role } from '../models/users/role'
import { Book } from '../models/books/book' 

require('dotenv').config()

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  models: [User, Role, Book],
  logging: false
})  

export default connection
