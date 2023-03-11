// @ts-ignore
import { Request, Response, NextFunction } from 'express'
import { Conflict, NotFound } from '../utils/error'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { Receipt } from '../models/shops/receipt'
import { Book_reserved } from '../models/shops/book_reserved'
import { Book } from '../models/books/book'
import { Status } from '../models/shops/status'
import { Sale_request } from '../models/shops/sales_request'

// Crear recibo 
export const createReceipt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let file_receipt = ''
    
        if ((req as any).files?.image?.[0]) {
            file_receipt = (req as any).files.image[0].filename
        }else{
            file_receipt = ''
        }
        if ((req as any).files?.pdf?.[0]) {
            file_receipt = (req as any).files.pdf[0].filename
        }else{
            file_receipt = ''
        }

        if (Object.keys(req.body).length === 0) {
            throw new Conflict('No se ha enviado ningún dato.')
          }

        // Create book
        const receipt = await Receipt.create({
            file_receipt : file_receipt 
        })
        await receipt.save()
        return res.status(StatusCodes.CREATED).json({
            message: `Se ha creado el recibo de forma exitosa.`,
            receipt: receipt
          })
        } catch (error) {
          console.log(error)
          return next(error)
        }
    
  }
  export const searchBooksReserved = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books_reserved = await Book_reserved.findAll({
        where: {
          '$book_reserved.id_sale$': { [Op.iLike]: `%${req.query.id_sale}%` },
        },
        include: [
          {
            model: Book_reserved,
          },
          Book,
        ],
      })
      return res.status(StatusCodes.OK).json({
        books_reserved: books_reserved
      })
    } catch (error) {
      return next(error)
    }
  }

  export const getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status = await Status.findAll()
        return res.status(StatusCodes.OK).json({
          status: status
        })
      } catch (error) {
        return next(error)
      }
  }
  export const getAllRequestSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sales_request = await Sale_request.findAll({
          include: [Book_reserved, Status, Receipt]
        })
        return res.status(StatusCodes.OK).json({
            sales_request: sales_request
        })
      } catch (error) {
        return next(error)
      }
  }
  export const findRequestSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sales_request = await Sale_request.findOne({
          where: { id: req.params.id },
          include: [Book_reserved, Status, Receipt]
        })
        if (!sales_request) throw new NotFound('Solicitud no valida...')
        return res.status(StatusCodes.OK).json(
          {
            sales_request: sales_request,
          },
          
        )
      } catch (error) {
        return next(error)
      }
  }
  export const createRequestSale = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.shopping_form)
    try{
      const {
        name,
        email,
        address,
        city,
        school_name,
        cellphone,
        zip_code,
        message
      } = req.body.shopping_form
  
      // check if there is content in request
      if (Object.keys(req.body).length === 0) {
        throw new Conflict('No se ha enviado ningún dato.')
      }
  
      const bookReserved = [];

      for (const item of req.body.cart) {
        bookReserved.push({
          id_book: item.id,
          amount: item.amount_selected
        });
      }
      // Create book
      const sales_request = await Sale_request.create(
        {
          name: name,
          email: email,
          address: address,
          purchase_date: Date.now(),
          city: city,
          school_name: school_name,
          cell: cellphone,
          zip_code: zip_code,
          comments: message,
          id_status: 1,
          book_reserved: bookReserved
        },
      { include: Book_reserved }
      )
  
      await sales_request.save()
  
      return res.status(StatusCodes.CREATED).json({
        message: `Se ha creado la solicitud de forma exitosa.`,
        sales_request: sales_request
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }

  export const updateRequestSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Find user
        const sale_request = await Sale_request.findByPk(req.params.id)
        if (!sale_request) throw new NotFound('Solicitud no encontrada')
    
        // Update user
        if (req.body.id_receipt) sale_request.id_receipt = req.body.id_receipt
        if (req.body.address) sale_request.address = req.body.address
        if (req.body.message) sale_request.comments = req.body.message
    
        await sale_request.save()
    
        // Response
        return res.status(StatusCodes.OK).json({
          message: `Se ha actualizado la solicitud de forma exitosa.`,
          sale_request: sale_request
        })
      } catch (error) {
        return next(error)
      }
  }