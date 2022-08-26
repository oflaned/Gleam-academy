import { Strategy } from 'passport-local'

const localStrategy = (passport) => {
  passport.use(
    new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
      if (username !== '1')
        return done(null, false, {
          message: 'User not found',
        })
      else if (password !== '1')
        return done(null, false, {
          message: 'Wrong password',
        })
      return done(null, { id: 1, name: 'Test', age: 21 })
    })
  )
}

export default localStrategy