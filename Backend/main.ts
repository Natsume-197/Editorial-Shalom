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

const app: Application = express()

// Middlewares
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Origin'],
    credentials: true,
    origin: ['http://localhost:3000', process.env.URL_SHALOM_FRONT!],
    maxAge: 600,
    exposedHeaders: ['*', 'Authorization'],
  })
)

app.use(helmet())
app.use(json())
app.use(express.urlencoded({ extended: true }))

// api prefix
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
  console.log(`Servidor disponible`)
  // call and connect to Database
  try {
    await connection.sync()
    // await reSyncDatabase()
    console.log('Conexión con la base de datos establecida')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})

async function reSyncDatabase() {
  // Force drop and resync
  await connection.sync({ force: true }).then(async () => {
    const db = connection.models

    // Tabla roles
    await db.Role.create({
      id: 1,
      name: 'Usuario'
    })

    await db.Role.create({
      id: 2,
      name: 'Administrador'
    })

    // Tabla Lenguajes
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
    
    // Añadir un libro
    await db.Book.create({
      id: 1,
      isbn: 124125124,
      price: 3000,
      released_date: new Date(1911, 5, 21)
    })

    await db.Book_t.create({
      id: 1,
      id_book: 1,
      id_language: 1,
      title: 'Caperucita Roja',
      description: 'Caperucita Roja era una niña que llevaba una capa roja con una capucha y por eso todos los que la conocían la llamaban así. Vivía con su madre en una casa cerca de un bosque. ',
      total_pages: 89
    })

    await db.Book_t.create({
      id: 2,
      id_book: 1,
      id_language: 2,
      title: 'Little Red Riding Hood',
      description: 'The story of Little Red Riding Hood is a folktale that was originally penned by Charles Perrault, and made popular by the Brothers Grimm. Its about a little girl, who wears an emblematic red velvet hood, who mistakes a wolf for her grandma!',
      total_pages: 85
    })

    /* 
    await db.User.create({
      id: 1,
      name: "Jonathan",
      second_name: "Ariza",
      isNaN
    })*/

    console.log('Base de datos sincronizada desde cero')
  })
}
