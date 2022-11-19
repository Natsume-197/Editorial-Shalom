import { Sequelize } from 'sequelize-typescript'

// Models
import { User } from '../models/user'
import { Role } from '../models/role'

require('dotenv').config()

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  models: [User, Role],
  logging: false
})  

export default connection
