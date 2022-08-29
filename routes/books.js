import express from 'express'
import { checkSchema } from 'express-validator'

import { checkAuth } from './../middleware/checkAuth.js'
import * as booksController from './../controllers/books.controller.js'
import * as booksSceme from '../schemes/books.Scheme.js'

export const booksRouter = express.Router()

booksRouter.get('/', 
    booksController.get
)

booksRouter.get('/:bookId',
    checkSchema(booksSceme.checkId),
    booksController.getBook
)

booksRouter.post('/', 
    checkAuth,
    checkSchema(booksSceme.checkFields),
    booksController.post
)

booksRouter.put('/:bookId',
    checkAuth,
    checkSchema(booksSceme.checkId),
    checkSchema(booksSceme.checkFields),
    booksController.put
)

booksRouter.delete('/:bookId',
    checkAuth, 
    checkSchema(booksSceme.checkId),
    booksController.del
)

booksRouter.patch('/:bookId',
    checkAuth,
    checkSchema(booksSceme.checkId),
    checkSchema(booksSceme.checkOptionalFields),
    booksController.patch
)
