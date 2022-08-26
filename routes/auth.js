import express from 'express'
import passport from 'passport'

export const authRouter = express.Router()

authRouter.get('/login', (req, res) => {
    res.send('Login page. Please, authorize.')
})

authRouter.post('/login',
    passport.authenticate('local', {
        successRedirect: '/books',
        failureRedirect: '/login',
    })
)