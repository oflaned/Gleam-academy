import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'

import { users } from '../../services/users.js'
import { wrongLogin } from '../../errors/errors.js'

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
}

const verifyCallBack = async (email, password, done) => {
    let user = users.find((user) => email === user.email)
    if (user === undefined) {
        return done(wrongLogin)
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return done(wrongLogin)
    }
    return done(null, user)
}

export const localStrategy = new Strategy(customFields, verifyCallBack)
