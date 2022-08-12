import { errorToJson, outOfArray, toManyFields} from './../errors/errors.js'
import { validationResult } from 'express-validator'
import * as service from './../services/books.services.js'

export async function get(req, res, next) {
    let books = await service.get()
    if(books.length === 0) {
        res.render('errors/getBooks')
    }
    try {
        return res.render('pages/getBooks' , { books: books })
    } catch(err) {
        console.error('Error while output books array')
        next(err)
    }
}

export async function getBook(req, res, next) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.render('errors/getBook', {
            numOfError: 400,
            error: errorToJson(errors)
        })
    }

    let bookId = Number(req.params.bookId)
    if(bookId >= service.lengthOfBooks()) {
        return res.render('errors/getBook', {
            numOfError: 404,
            error: outOfArray
        })

    }

    let book = await service.getBook(bookId)
    try {
        return res.render('pages/getBook', {book: book})
    } catch(err) {
        console.error('Error while output book')
        next(err)
    }    
}

export async function post(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errorToJson(errors))
    }

    if(Object.keys(req.body).length !== 3){
        return res.status(400).json(toManyFields)
    }

    try {
        return res.json(await service.post(req.body))
    } catch(err){
        console.error('Error while post book')
        next(err)
    }    
}

export async function put(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errorToJson(errors))
    }
    
    let bookId = Number(req.params.bookId)
    if(bookId >= books.length) { 
        res.status(404).json(outOfArray) 
    }

    if(Object.keys(req.body).length !== 3) {
        return res.status(400).json(toManyFields)
    }

    try {
        return res.send(await service.put(req.body, bookId))
    } catch(err){
        console.error('Error while post book')
        next(err)
    }   
}

export async function del(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if (bookId >= books.length) { 
        return res.status(404).json(outOfArray) 
    }

    try {
        return res.send(await service.del(bookId))
    } catch(err){
        console.error('Error while post book')
        next(err)
    } 
}

export async function patch(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if(bookId >= books.length) { 
        return res.status(404).json(outOfArray) 
    } 

    let keys = ['title', 'description', 'price']
    
    if(!Object.keys(req.body).every( elem => keys.includes(elem) )){
        return res.status(400).json(toManyFields)
    }
    
    try {
        return res.json(await service.patch(req.body,bookId))
    } catch(err){
        console.error('Error while patch book')
        next(err)
    } 
}
