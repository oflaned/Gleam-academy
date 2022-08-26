import express from 'express'
import passport from 'passport'
import session from 'express-session'
import dot from 'dotenv'

import { error } from './middleware/errors.js'
import { sessionConfig } from './config/session.js'
import { indexRouter } from './routes/index.js'
import { booksRouter } from './routes/books.js'
import { authRouter } from './routes/auth.js'
import passportConfig from './config/passport.js'


dot.config()
const port = process.env.PORT ? process.env.PORT : 8000

const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(session(sessionConfig))
passportConfig(passport, app)

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/books/', booksRouter)
app.use(error)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
