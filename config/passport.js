import { users } from '../services/users.js'
import { localStrategy } from './strategies/local.strategy.js'

const passportConfig = (passport, app) => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        if (id < users.length) {
            done(null, { id: users[id].id, name: users[id].name })
        } else {
            //remove auth from cookie?
            done('err')
        }
    })
    passport.use(localStrategy)
}

export default passportConfig
