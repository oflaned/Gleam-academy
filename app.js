import dot from 'dotenv'
import express from 'express'

import { indexRouter } from './routes/index.js'
import { booksRouter } from './routes/books.js'

dot.config()
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())

const port = process.env.PORT ? process.env.PORT : 8000

app.use('/', indexRouter)
app.use('/books/', booksRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
