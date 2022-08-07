import { errorToJson, outOfArray, toManyFields} from './../errors/errors.js'
import { validationResult } from 'express-validator'
import * as service from './../services/books.services.js'
import { books } from './../services/books.services.js'
export async function get(req, res, next) {
    try {
        return res.json(await service.get())
    } catch(err) {
        console.error('Error while output books array')
        next(err)
    }
}

export async function getBook(req, res, next) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errorToJson(errors))
    }

    let bookId = Number(req.params.bookId)
    if(bookId >= books.length) { 
        res.status(404).json(outOfArray) 
    }

    try {
        return res.json(await service.getBook(bookId))
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
