import express from 'express'
import { checkSchema } from 'express-validator'
import * as booksController from './../controllers/books.controller.js'
import * as booksScema from '../schemas/books.Scmema.js'

export const booksRouter = express.Router({ extended: true})

booksRouter.get('/', 
    booksController.get
)

booksRouter.get('/:bookId',
    checkSchema(booksScema.checkId),
    booksController.getBook
)

booksRouter.post('/', 
    checkSchema(booksScema.checkFields),
    booksController.post
)

booksRouter.put('/:bookId',
    checkSchema(booksScema.checkId),
    checkSchema(booksScema.checkFields),
    booksController.put
)

booksRouter.delete('/:bookId', 
    checkSchema(booksScema.checkId),
    booksController.del
)

booksRouter.patch('/:bookId',
    checkSchema(booksScema.checkId),
    checkSchema(booksScema.checkOptionalFields), 
    booksController.patch
)
