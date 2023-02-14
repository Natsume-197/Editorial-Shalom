import { Request, Response, NextFunction } from 'express'
import { Conflict, NotFound } from '../utils/error'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { Book } from '../models/books/book'
import path from 'path'

// Función para subir portada de un libro
export const uploadCoverBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const filePath = path.join(__dirname, req.file.path);
      console.log(filePath)
      res.send('Single file uploaded successfully')
    } else {
      res.status(400).send('Please upload a valid image')
    }
  } catch (error) {
    return next(error)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const searchBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll({
      where: {
        title: { [Op.iLike]: `%${req.query.query}%` }
      }
    })

    return res.status(StatusCodes.OK).json({
      message: 'Se han encontrado los siguientes libros',
      books: books
    })
  } catch (error) {
    return next(error)
  }
}

export const findBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id)
  try {
    const book = await Book.findOne({
      where: { id: req.params.id }
    })
    if (!book) throw new NotFound('Libro no válido...')
    return res.status(StatusCodes.OK).json({
      message: `Se ha encontrado el libro: '${book.title}' de forma exitosa.`,
      book: book
    })
  } catch (error) {
    return next(error)
  }
}

// CRUD Functions
// Get all books
export const getAllBooks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll()
    return res.status(StatusCodes.OK).json({
      message: 'Libros encontrados',
      books: books
    })
  } catch (error) {
    return next(error)
  }
}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // read from body
    const { title, description, total_pages, isbn, price, format, released_date } = req.body

    // check if there is content in request
    if (Object.keys(req.body).length === 0) {
      throw new Conflict('No se ha enviado ningún dato.')
    }

    // check if book already exists
    const oldBook = await Book.findOne({
      where: { isbn: isbn }
    })
    if (oldBook) {
      throw new Conflict('Este ISBN ya está en uso...')
    }

    // Create book
    const book = await Book.create({
      title: title,
      description: description,
      total_pages: total_pages,
      isbn: isbn,
      price: price,
      format: format,
      released_date: released_date
    })

    await book.save()

    return res.status(StatusCodes.CREATED).json({
      message: `Se ha creado el libro: '${req.body.name}' de forma exitosa.`,
      book: book
    })
  } catch (error) {
    return next(error)
  }
}

export const findBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findAll({
      where: { name: req.params.name }
    })
    if (!book) throw new NotFound('Libro no válido...')
    return res.status(StatusCodes.OK).json({
      message: `Se ha encontrado el libro: '${req.body.name}' de forma exitosa.`,
      book: book
    })
  } catch (error) {
    return next(error)
  }
}
