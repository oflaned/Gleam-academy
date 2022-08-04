import dot from 'dotenv'
import express from 'express'

import { indexRouter } from './routes/index.js'
import { booksRouter } from './routes/books.js'

dot.config()
const app = express()
app.use(express.json());

app.use('/', indexRouter)
app.use('/books/', booksRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
