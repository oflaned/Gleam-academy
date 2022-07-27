import dot from 'dotenv'
import express from 'express'
import fs from 'fs';

dot.config()
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/health', (req, res)=> {
    res.sendStatus(200)
})

app.get('/books/:bookid?', (req, res) => {
    let data = JSON.parse(fs.readFileSync(process.env.booksData))
    if(!req.params.bookid) { res.send(data) }
    else if(!Number.isInteger(Number(req.params.bookid)) || req.params.bookid.includes('-')) res.sendStatus(400)// указать минимальную для запуска ноду - 16 версии
    else if(Number(req.params.bookid) < data.length){
        res.send(data[Number(req.params.bookid)]) 
    } else res.sendStatus(404)
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
