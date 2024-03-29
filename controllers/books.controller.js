import { validationResult } from 'express-validator'

import { errorToJson, outOfArray, toManyFields } from './../errors/errors.js'
import * as service from './../services/books.services.js'

export async function get(req, res, next) {
    try {
        return res.render('pages/getBooks', { books: await service.get() })
    } catch (err) {
        console.error('Error while output books array')
        next(err)
    }
}

export async function getBook(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(await errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if (bookId >= service.lengthOfBooks()) {
        return next(outOfArray)
    }

    try {
        return res.render('pages/getBook', {
            book: await service.getBook(bookId),
        })
    } catch (err) {
        console.error('Error while output book')
        next(err)
    }
}

export async function post(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(await errorToJson(errors))
    }

    if (Object.keys(req.body).length !== 3) {
        return next(toManyFields)
    }

    try {
        return res.json(await service.post(req.body))
    } catch (err) {
        console.error('Error while post book')
        next(err)
    }
}

export async function put(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(await errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if (bookId >= service.lengthOfBooks()) {
        return next(outOfArray)
    }

    if (Object.keys(req.body).length !== 3) {
        return next(toManyFields)
    }

    try {
        return res.send(await service.put(req.body, bookId))
    } catch (err) {
        console.error('Error while post book')
        next(err)
    }
}

export async function del(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(await errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if (bookId >= service.lengthOfBooks()) {
        return next(outOfArray)
    }

    try {
        return res.send(await service.del(bookId))
    } catch (err) {
        console.error('Error while post book')
        next(err)
    }
}

export async function patch(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(await errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if (bookId >= service.lengthOfBooks()) {
        return next(outOfArray)
    }

    let keys = ['title', 'description', 'price']

    if (!Object.keys(req.body).every((elem) => keys.includes(elem))) {
        return next(toManyFields)
    }

    try {
        return res.json(await service.patch(req.body, bookId))
    } catch (err) {
        console.error('Error while patch book')
        next(err)
    }
}
