import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'

import { users } from '../../services/users.js'

const localStrategy = (passport) => {
  passport.use(
    new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
      let user = users.find((user) => email === user.email)
      if (user === undefined) {
        return done(null, false, {
          message: 'email not found',
        })
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, {
          message: 'Wrong password',
        })
      }
      return done(null, { id: user.id, name: user.name})
    })
  )
}

export default localStrategy