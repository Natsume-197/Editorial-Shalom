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
import { Request_message } from '../models/shops/request_message'
import { Book_t } from '../models/books/book_t'
import { Category } from '../models/books/category'

// Crear recibo 
export const createReceipt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let file_receipt = ''

    if ((req as any).files?.image?.[0]) {
      file_receipt = (req as any).files.image[0].filename
    } else {
      file_receipt = ''
    }
    if ((req as any).files?.pdf?.[0]) {
      file_receipt = (req as any).files.pdf[0].filename
    } else {
      file_receipt = ''
    }

    if (Object.keys(req.body).length === 0) {
      throw new Conflict('No se ha enviado ningún dato.')
    }

    // Create book
    const receipt = await Receipt.create({
      file_receipt: file_receipt
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
      where: { id: req.params.id 
      },
      include: [Book_reserved,Book],
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
export const getAllRequestSaleForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales_request = await Sale_request.findAll({
      where: { id_user: req.params.id },
      include: [Book_reserved, Status, Receipt, Request_message]
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

export const findRequestSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales_request = await Sale_request.findOne({
      where: { id: req.params.id },
      include: [Book_reserved, Status, Receipt, Request_message]
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
  try {
    const {
      name,
      email,
      address,
      message,
      city,
      school_name,
      cellphone,
      zip_code,
      id
    } = req.body.shopping_form

    // check if there is content in request
    if (Object.keys(req.body).length === 0) {
      throw new Conflict('No se ha enviado ningún dato.')
    }

    const bookReserved = [];
    let total_price = 0
    for (const item of req.body.cart) {
      let book = await Book.findOne({
        where: { id: item.id },
        include: [Book_t, Category]
      })
      if (book != null) {
        let cost = (book.price * item.amount_selected);
        total_price += cost
        bookReserved.push({
          id_book: item.id,
          amount: item.amount_selected,
          price: cost
        });
      }
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
        id_status: 1,
        id_user: id,
        total: total_price,
        comments: message,
        book_reserved: bookReserved,
      },
      { include: [Book_reserved] }
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

export const getAllMessageForRequestSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales_request = await Sale_request.findAll({
      where: { id_sale: req.params.id },
      include: [Book_reserved, Status, Receipt, Request_message]
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

export const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id,
      user,
      message,
    } = req.body

    // check if there is content in request|
    if (Object.keys(req.body).length === 0) {
      throw new Conflict('No se ha enviado ningún dato.')
    }
    // Add message
    const request_message = await Request_message.create(
      {
        id_sale: id,
        id_user: user,
        comments: message,
        purchase_date: Date.now(),
      }
    )

    await request_message.save()

    return res.status(StatusCodes.CREATED).json({
      message: `Se ha añadido el mensae de forma exitosa.`,
      request_message: request_message
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