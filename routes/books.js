import express from 'express';

export const booksRouter = express.Router();

let books = []

booksRouter.post('/', (req, res) => {
    let body = req.body

    if(body['title'] != null && body['description'] != null && body['price'] != null && Object.keys(body).length === 3) {
        if (body['title'].length && body['description'].length && Number(body['price'])>0) {
            books.push({title: body['title'], description: body['description'], price: Number(body['price'])})
            return res.status(201).json(books[books.length-1])
        }

        return res.status(400).json({
            statusCode: 400,
            message: 'Incorret data in fields',
            error: 'Incorrect Input'
        })
    }

    return res.status(400).send({
        statusCode: 400,
        message: 'Incorret fields',
        error: 'Incorrect Input'
    })
})

booksRouter.put('/:bookid', (req, res) => {
    let bookid = Number(req.params.bookid)
    if(!Number.isInteger(bookid) || bookid < 0) { 
        return res.status(400).send({
            statusCode: 400,
            message: 'Incorret parametr',
            error: 'Incorrect Input'
    })}
    let body = req.body
    if(body['title'] != null && body['description'] != null && body['price'] != null && Object.keys(body).length === 3) {
        if (body['title'].length && body['description'].length && Number(body['price'])>0) {
            //books.push({title: body['title'], description: body['description'], price: Number(body['price'])})
            //return res.status(201).json(books[books.length-1])
        }

        return res.status(400).json({
            statusCode: 400,
            message: 'Incorret data in fields',
            error: 'Incorrect Input'
        })
    }

    return res.status(400).send({
        statusCode: 400,
        message: 'Incorret fields',
        error: 'Incorrect Input'
    })

})

booksRouter.get('/:bookid?', (req, res) => {
    if(!req.params.bookid) { return res.json(books) }
    let bookid = Number(req.params.bookid)
    if(!Number.isInteger(bookid) || bookid < 0) { return res.sendStatus(400) }
    if(bookid < books.length) { return res.json(books[bookid]) }
    res.sendStatus(404)
})

