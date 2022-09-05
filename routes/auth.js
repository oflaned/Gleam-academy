import express from 'express'
import { checkSchema } from 'express-validator'
import passport from 'passport'

import {
    getLogin,
    postRegister,
    postLogin,
    getRegister,
} from '../controllers/auth.contoller.js'
import { checkEmail, checkPassword } from '../schemes/auth.Shceme.js'

export const authRouter = express.Router()

authRouter.get('', getLogin)

authRouter.get('/login', getLogin)

authRouter.get('/register', getRegister)

authRouter.post(
    '/login',
    checkSchema(checkEmail),
    checkSchema(checkPassword),
    postLogin,
    passport.authenticate('local', {
        successRedirect: '/books',
        failureRedirect: '/auth/login',
    })
)

authRouter.post(
    '/register',
    checkSchema(checkEmail),
    checkSchema(checkPassword),
    postRegister
)
