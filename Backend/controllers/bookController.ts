// @ts-ignore
import { Request, Response, NextFunction } from 'express'
import { Conflict, NotFound } from '../utils/error'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { Book } from '../models/books/book'
import { Book_t } from '../models/books/book_t'
import { Category } from '../models/books/category'

// Recolección de información
export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.findAll()
    return res.status(StatusCodes.OK).json({
      categories: categories
    })
  } catch (error) {
    return next(error)
  }
}

// Funciones CRUD
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let cover = ''
    let preview = ''

    if ((req as any).files?.image?.[0]) {
      cover = (req as any).files.image[0].filename
    }else{
      cover = ''
    }

    if ((req as any).files?.pdf?.[0]) {
      preview = (req as any).files.pdf[0].filename
    }else{
      preview = ''
    }

    const {
      title,
      isbn,
      description,
      category,
      released_date,
      total_pages,
      price,
      available_units,
      title_english,
      description_english
    } = req.body

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
    const book = await Book.create(
      {
        isbn: isbn,
        id_category: category,
        released_date: released_date,
        published_date: Date.now(),
        total_pages: total_pages,
        price: price,
        units_available: available_units,
        cover: cover,
        preview: preview,
        book_t: [
          {
            id_language: 1,
            title: title,
            description: description
          },
          {
            id_language: 2,
            title: title_english,
            description: description_english
          }
        ]
      },
      { include: Book_t }
    )

    await book.save()

    return res.status(StatusCodes.CREATED).json({
      message: `Se ha creado el libro: '${req.body.name}' de forma exitosa.`,
      book: book
    })
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

export const findBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id)
  try {
    const book = await Book.findOne({
      where: { id: req.params.id },
      include: [Book_t, Category]
    })
    if (!book) throw new NotFound('Libro no válido...')
    return res.status(StatusCodes.OK).json(
      {
        book: book,
      },
      
    )
  } catch (error) {
    return next(error)
  }
}

export const searchBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll({
      where: {
        '$book_t.title$': { [Op.iLike]: `%${req.query.name}%` },
      },
      include: [
        {
          model: Book_t,
        },
        Category,
      ],
    })
    return res.status(StatusCodes.OK).json({
      books: books
    })
  } catch (error) {
    return next(error)
  }
}

export const getAllBooks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll({
      include: [Book_t, Category]
    })
    return res.status(StatusCodes.OK).json({
      books: books
    })
  } catch (error) {
    return next(error)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// CRUD Functions
// Get all books


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
