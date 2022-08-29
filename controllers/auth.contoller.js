import { validationResult } from 'express-validator'
import { badDataFields, toManyFields } from '../errors/errors.js'
import { register } from '../services/users.js'
import { users } from '../services/users.js'

export async function getLogin(req, res, next) {
    res.send('Login page. Please, authorize.')
}

export async function postLogin(req, res, next) {
    if(Object.keys(req.body).length !== 2) {
        return next(toManyFields)
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return next(badDataFields)
    }
    next()
}

export async function postRegister(req, res, next) {
    if(Object.keys(req.body).length !== 2) {
        return next(toManyFields)
    }
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return next(badDataFields)
    }

    let user = users.find((user) => req.body.email === user.email)
    if (user !== undefined) {
        return res.send('email is already busy')
    }

    return res.send('your email: ' + await register(req.body))
}