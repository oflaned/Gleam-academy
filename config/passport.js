import localStrategy from "./strategies/local.strategy.js"
import { users } from "../services/users.js"

const passportConfig = (passport, app) => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
      done(null, user.id);
    })
  
    passport.deserializeUser((id, done) => {
      if (id < users.length) {
        done(null, {id: users[id].id, name: users[id].name })
      }
      else {
        done('err')
      }
    })
    localStrategy(passport)
    
  }

  export default passportConfig