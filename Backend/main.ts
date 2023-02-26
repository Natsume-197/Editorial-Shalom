// Libraries
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { json } from 'body-parser'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()
//Error handler
import { handleErrors } from './middleware/errorHandler'
// Database
import connection from './database/db_posgres'
// Router
import { router } from './routes/router'

import { faker } from '@faker-js/faker'

import bcrypt from 'bcrypt'
import { User_role } from './models/users/user_role'
import { User } from './models/users/user'
import { Book } from './models/books/book'
import { Book_t } from './models/books/book_t'
import { Category } from './models/books/category'
import { Language } from './models/books/language'
import { ModelCtor, Model } from 'sequelize'


const app: Application = express()

// Middlewares
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Origin'],
    credentials: true,
    origin: ['http://localhost:3000', process.env.URL_SHALOM_FRONT!],
    maxAge: 600,
    exposedHeaders: ['*', 'Authorization']
  })
)

app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(json())
app.use(express.urlencoded({ extended: true }))

// Access media uploaded from outside (DigitalOcean)
app.use('/api/assets/books/covers', express.static(path.join(__dirname, '../assets/books/covers')))

// Access media uploaded from outside localhost
app.use('/api/assets/books/covers', express.static(path.join(__dirname, '/assets/books/covers')))

// API prefix
app.use('/api', router)
app.use(handleErrors)

if (!parseInt(process.env.PORT as string)) {
  process.exit(1)
}

/*ENABLE THIS FOR DEPLOYMENT */

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('/*', (_req, res) => {
  // res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
  res.status(200).json({ message: 'API de la Editorial Shalom funcionando :)' })
})

// Starting the Server
app.listen(process.env.PORT || 5000, async () => {
  console.log('==================================================')
  console.log(`Servidor web (API) disponible`)
  // call and connect to Database
  try {
    await connection.sync()
    console.log(`Base de datos disponible`)
    await reSyncDatabase()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})

async function reSyncDatabase() {
  // Force drop and resync
  await connection.sync({ force: true }).then(async () => {
    const db = connection.models
    console.log(`Sincronizando base de datos...`)

    // Add content to each table
    await addCategoriesBook(db)
    await addRoles(db)
    await addLanguages(db)
    await addBooks(5)
    await addUsers(5)

    console.log('Base de datos sincronizada desde cero')
  })
}

async function addBooks(amount: number) {
  for (let i = 1; i <= amount; i++) {
    const book = await Book.create(
      {
        isbn: faker.random.numeric(10),
        id_category: faker.datatype.number({ min: 1, max: 3 }),
        released_date: faker.date.recent(),
        published_date: faker.date.recent(10),
        total_pages: faker.random.numeric(3),
        price: faker.finance.amount(30000, 110000, 0),
        units_available: faker.datatype.number({ min: 1, max: 100 }),
        book_t: [
          {
            id_language: 1,
            title: faker.lorem.words(5),
            description: 'Español:' + faker.lorem.words(30)
          },
          {
            id_language: 2,
            title: faker.lorem.words(5),
            description: 'English: ' + faker.lorem.words(30)
          }
        ]
      },
      { include: Book_t }
    )
    await book.save()
  }
}

async function addCategoriesBook(db: { [x: string]: ModelCtor<Model<any, any>>; Category?: any }) {
  await db.Category.create({
    id: 1,
    name: 'Ingles'
  })
  await db.Category.create({
    id: 2,
    name: 'Lectoescritura'
  })
  await db.Category.create({
    id: 3,
    name: 'Integrados'
  })
  await db.Category.create({
    id: 4,
    name: 'Matemáticas'
  })
}

async function addRoles(db: { [x: string]: ModelCtor<Model<any, any>>; Role?: any }) {
  await db.Role.create({
    id: 1,
    name: 'Usuario'
  })
  await db.Role.create({
    id: 2,
    name: 'Administrador'
  })
}

async function addLanguages(db: { [x: string]: ModelCtor<Model<any, any>>; Language?: any }) {
  await db.Language.create({
    id: 1,
    code: 'es',
    description: 'Español'
  })

  await db.Language.create({
    id: 2,
    code: 'en',
    description: 'Ingles'
  })
}

async function addUsers(amount: number) {
  // Usuario administrador
  let roles = [1, 2]
  let userRoles = roles.map(roleId => ({ id_role: roleId }))

  const password = 'admin123'
  const salt: string = await bcrypt.genSalt(10)
  const encryptedPassword: string = await bcrypt.hash(password, salt)

  const user = await User.create(
    {
      name: 'Administrator',
      second_name: '',
      address: '',
      email: 'jonathan.197ariza@gmail.com'.toLowerCase(),
      password: encryptedPassword,
      cellphone: '',
      email_token: '',
      is_verified: true,
      user_roles: userRoles
    },
    { include: User_role }
  )

  await user.save()

  // Usuarios prueba
  roles = [1]
  userRoles = roles.map(roleId => ({ id_role: roleId }))
  for (let i = 1; i <= amount; i++) {
    const password = faker.internet.password()
    const salt: string = await bcrypt.genSalt(10)
    const encryptedPassword: string = await bcrypt.hash(password, salt)

    const user = await User.create(
      {
        name: faker.name.firstName(),
        second_name: faker.name.lastName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email().toLowerCase(),
        password: encryptedPassword,
        cellphone: faker.phone.number(),
        email_token: faker.random.numeric(10),
        is_verified: true,
        user_roles: userRoles
      },
      { include: User_role }
    )

    await user.save()
  }
}
