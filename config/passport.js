import localStrategy from "./strategies/local.strategy.js"

const passportConfig = (passport, app) => {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.serializeUser((user, done) => {
      console.log(`serialize ${user.id}`)
      done(null, user.id);
    })
  
    passport.deserializeUser((id, done) => {
      console.log('deserialize')
      if(id === 1)
        done(null, { id: 1, name: 'Test', age: 21 })
    })
    localStrategy(passport)
    
  }

  export default passportConfig