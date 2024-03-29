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
import { User } from '../models/users/user'
import { sendConfirmationOrderStatusChange, sendConfirmationShopEmail, sendConfirmationShopEmailAdmin } from '../services/mailService'

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
    const book_reserved = await Book_reserved.findAll({
      where: { id_sale: req.params.id },
      include: [ { model : Book , include: [Book_t] }]
    })
    if (!book_reserved) throw new NotFound('La solicitud no tiene libros...')
    return res.status(StatusCodes.OK).json(
      {
        book_reserved: book_reserved,
      },

    )
  } catch (error) {
    return next(error)
  }
}

export const getStatus = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const status = await Status.findAll()
    return res.status(StatusCodes.OK).json({
      status: status
    })
  } catch (error) {
    return next(error)
  }
}


export const getAllRequestSale = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const sales_request = await Sale_request.findAll({
      include: [{model :Book_reserved, include :[{model:Book, include:[Book_t, Category]}]}, Status, Receipt, Request_message]
    })
    if (!sales_request) throw new NotFound('No hay ninguna solicitud...')
    return res.status(StatusCodes.OK).json({
      sales_request: sales_request
    })
  } catch (error) {
    return next(error)
  }
}

export const getAllRequestSaleForStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales_request = await Sale_request.findAll({
      where: { id_status: req.params.id },
      include: [{model :Book_reserved, include :[{model:Book, include:[Book_t, Category]}]}, Status, Receipt, Request_message]
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
      include: [{model :Book_reserved, include :[{model:Book, include:[Book_t, Category]}]}, Status, Receipt, Request_message]
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
      include: [{model :Book_reserved, include :[{model:Book, include:[Book_t, Category]}]}, Status, Receipt, Request_message]
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
    if (Object.keys(req.body.shopping_form.email).length === 0) {
      throw new Conflict('No se ha enviado el correo.')
    }
    if (Object.keys(req.body.shopping_form.name).length === 0) {
      throw new Conflict('No se ha enviado el nombre.')
    }
    if (Object.keys(req.body.shopping_form.address).length === 0) {
      throw new Conflict('No se ha enviado la dirección.')
    }
    if (Object.keys(req.body.shopping_form.city).length === 0) {
      throw new Conflict('No se ha enviado la ciudad.')
    }
    if (Object.keys(req.body.shopping_form.cellphone).length === 0) {
      throw new Conflict('No se ha enviado el numero de celular.')
    }

    const bookReserved = [];
    let total_price = 0
    const books = [];
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
        let units = book.units_available-item.amount_selected
        if(units > 0){
          book.units_available = units
          books.push({book});
        }
        else{
          throw new Conflict('La cantidad de unidades del libro '+book.book_t[0].title+' es mayor a la disponible.')
        }
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
    for (const book of books){
      await book.book.save()
    }
    await sendConfirmationShopEmail(sales_request.name, email, sales_request.id.toString())
    await sendConfirmationShopEmailAdmin(sales_request.id.toString(), sales_request.id_user.toString(),sales_request.cell )
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
    const request_message = await Request_message.findAll({
      where: { id_sale: req.params.id },
      include: [User]
    })
    if (!request_message) throw new NotFound('Solicitud no valida...')
    return res.status(StatusCodes.OK).json(
      {
        request_message: request_message,
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
        message_date: Date.now(),
        is_readed: false
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
export const updateMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request_messages = await Request_message.findAll({
      where: { id_sale: req.params.id },
      include: [User]
    })
    if (!request_messages) throw new NotFound('Solicitud no valida...')
    for (const mesagge of request_messages){
      if(!mesagge.is_readed) {
        mesagge.is_readed = true
        await mesagge.save()
      }

    }
    return res.status(StatusCodes.OK).json({
      message: `Se ha actualizado los mensajes de forma exitosa.`,
      request_messages: request_messages
    })
  } catch (error) {
    return next(error)
  }
}

export const updateRequestSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale_request = await Sale_request.findByPk(req.params.id,
      {
        include: [Book_reserved]
      })
    if (!sale_request) throw new NotFound('Solicitud no encontrada')
    if (sale_request.id_status === req.body.id_status) throw new NotFound('La solicitud ya se encuentra en el estado que desea asignar')
    if (req.body.id_status) sale_request.id_status = req.body.id_status

    await sale_request.save()
    const status = await Status.findByPk(req.body.id_status)
    if(!status) throw new NotFound('El estado no fue encontrado')
    await sendConfirmationOrderStatusChange(status.name, sale_request.id.toString())
    if (sale_request.id_status === 8 || sale_request.id_status === 7) {
      const books = [];
      for (const item of sale_request.book_reserved) {
        let book = await Book.findOne({
          where: { id: item.id_book },
          include: [Book_t, Category]
        })
        if (book != null) {
          let units = book.units_available+item.amount
          book.units_available = units
          books.push({book});
        }
      }
      for (const book of books){
        await book.book.save()
      }
    }
    // Response
    return res.status(StatusCodes.OK).json({
      message: `Se ha actualizado la solicitud de forma exitosa.`,
      sale_request: sale_request
    })
  } catch (error) {
    return next(error)
  }
}