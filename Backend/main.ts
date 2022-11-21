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
      allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
      credentials: true,
      origin: ['http://localhost:3000', process.env.URL_SHALOM_FRONT!],
      maxAge: 600,
      exposedHeaders: ['*', 'Authorization' ] 
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
    await reSyncDatabase()
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

    // Data insertion for roles
    await db.Role.create({
      id: 1,
      name: 'User'
    })

    await db.Role.create({
      id: 2,
      name: 'Moderator'
    })

    await db.Role.create({
      id: 3,
      name: 'Admin'
    })

    console.log('Base de datos resincronizada')
  })
}
