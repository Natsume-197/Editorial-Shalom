import { Request, Response, NextFunction } from 'express'

// Models
import { Book } from '../models/book'
// Error Handler
import { Conflict, NotFound } from '../utils/error'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // read from body
        const { name, category, amount, available, ISBN, publication} = req.body
        // check if book already exists
        const oldBook = await Book.findOne({
            where: { ISBN: ISBN }
        })
        if (oldBook) {
            throw new Conflict('Este ISBN ya está en uso...')
        }

        // Create book 
        const book = await Book.create({
            name: name,
            category: category,
            amount: amount,
            available: available,
            ISBN: ISBN,
            publication: publication
        })

        await book.save()

        return res.status(StatusCodes.CREATED).json({
            message:`Se ha creado el libro: '${req.body.name}' de forma exitosa.`,
            book: book
        })
    } catch(error){
        return next(error)
    }
}
export const findBook = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const book = await Book.findOne({
            where:{ name: req.params.name}
        })
        if(!book) throw new NotFound('Libro no válido...')
        return res.status(StatusCodes.OK).json({
            message:`Se ha encontrado el libro: '${req.body.name}' de forma exitosa.`,
            book: book
        })
    }catch(error){
        return next(error)
    }
}

export const findBooks = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const book = await Book.findAll({
            where:{ name: req.params.name}
        })
        if(!book) throw new NotFound('Libro no válido...')
        return res.status(StatusCodes.OK).json({
            message:`Se ha encontrado el libro: '${req.body.name}' de forma exitosa.`,
            book: book
        })
    }catch(error){
        return next(error)
    }
}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try{
        var book = await Book.findOne({
            where:{ name: req.params.name}
        })
        if(!book) throw new NotFound('Libro no válido...')
        book.name = req.params.name
        book.publication = new Date (req.params.publication)
        book.available = req.params.available.toLowerCase() === 'true'
        book.amount = parseInt(req.params.amount)
        book.category = req.params.category
        await book.save()
        return res.status(StatusCodes.OK).json({
            message:`Se ha actualizado el libro: '${req.body.name}' de forma exitosa.`,
            book: book
        })
    } catch(error){
        return next(error)
    }
}
