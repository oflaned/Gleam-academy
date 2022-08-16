import express from 'express'
import { checkSchema } from 'express-validator'

import * as booksController from './../controllers/books.controller.js'
import * as booksSceme from '../schemes/books.Scmeme.js'

export const booksRouter = express.Router()

booksRouter.get('/', 
    booksController.get
)

booksRouter.get('/:bookId',
    checkSchema(booksSceme.checkId),
    booksController.getBook
)

booksRouter.post('/', 
    checkSchema(booksSceme.checkFields),
    booksController.post
)

booksRouter.put('/:bookId',
    checkSchema(booksSceme.checkId),
    checkSchema(booksSceme.checkFields),
    booksController.put
)

booksRouter.delete('/:bookId', 
    checkSchema(booksSceme.checkId),
    booksController.del
)

booksRouter.patch('/:bookId',
    checkSchema(booksSceme.checkId),
    checkSchema(booksSceme.checkOptionalFields), 
    booksController.patch
)
