import { validationResult } from 'express-validator'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { badDataFields, toManyFields } from '../errors/errors.js'
import { register } from '../services/users.js'
import { users } from '../services/users.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function getLogin(req, res, next) {
    res.render('./../views/pages/auth/login.ejs')
}

export async function postLogin(req, res, next) {
    if (Object.keys(req.body).length !== 2) {
        return next(toManyFields)
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(badDataFields)
    }
    next()
}

export async function getRegister(req, res, next) {
    res.render('./../views/pages/auth/register.ejs')
}

export async function postRegister(req, res, next) {
    if (Object.keys(req.body).length !== 2) {
        return next(toManyFields)
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(badDataFields)
    }

    let user = users.find((user) => req.body.email === user.email)
    if (user !== undefined) {
        return res.send('email is already busy')
    }

    return res.send('your email: ' + (await register(req.body)))
}
