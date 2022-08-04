import express from 'express';

export const booksRouter = express.Router({ extended: true});

var books = []

const badParametr = {
    statusCode: 400,
    message: 'Incorret value of parametr',
    error: 'Incorrect Input'
}

const badDataFields = {
    statusCode: 400,
    message: 'Incorret data in fields',
    error: 'Incorrect Input'
}

const badFields = {
    statusCode: 400,
    message: 'Incorret fields',
    error: 'Incorrect Input'
}
const outOfErray = {
    statusCode: 404,
    message: 'Parametr more than length of array',
    error: 'Out of Array'
}


booksRouter.get('/:bookid?', (req, res) => {
    if(!req.params.bookid) { return res.json(books) }
    let bookid = Number(req.params.bookid)

    if(!Number.isInteger(bookid) || bookid < 0) { return res.status(400).json(badParametr) }
    if(bookid >= books.length)  { res.status(404).json(outOfErray) }
    return res.json(books[bookid]) 
})

booksRouter.post('/', (req, res) => {
    let body = req.body
    if(body['title'] === undefined || body['description'] === undefined || body['price'] === undefined || Object.keys(body).length !== 3) {
        return res.status(400).json(badFields)
    }
    if (body['title'] === '' || body['description'] === '' || isNaN(body['price']) || Number(body['price']) <= 0) {
        return res.status(400).json(badDataFields) 
    }

    books.push({title: body['title'], description: body['description'], price: Number(body['price'])})
    return res.status(201).json(books[books.length-1])
    
})

booksRouter.patch('/:bookid', (req, res) => {
    let bookid = Number(req.params.bookid)
    if(!Number.isInteger(bookid) || bookid < 0) { return res.status(400).json(badParametr) } 

    let body = req.body
    let counter = 0
    let toChange = new Map()
    if(body['title'] !== undefined) {
        if(body['title'] === '') { return res.status(400).json(badDataFields) }
        toChange.set('title', body['title'])
        counter += 1
    }
    if(body['description'] !== undefined) {
        if(body['description'] === '') { return res.status(400).json(badDataFields) }
        toChange.set('description', body['description'])
        counter += 1
    }
    if(body['price'] !== undefined) {
        if(Number(body['price']) <= 0 || isNaN(body['price'])) { return res.status(400).json(badDataFields) }
        toChange.set('price', body['price'])
        counter += 1
    }

    if(Object.keys(body).length !== counter) { return res.status(400).json(badFields) }
    if(bookid >= books.length) { return res.status(404).json(outOfErray) }

    toChange.forEach((value, key) => { books[bookid][`${key}`] = value })
    return res.json(books[bookid])
})

booksRouter.put('/:bookid', (req, res) => {
    let bookid = Number(req.params.bookid)
    if(!Number.isInteger(bookid) || bookid < 0) { return res.status(400).json(badParametr) }

    let body = req.body
    if(body['title'] === undefined || body['description'] === undefined || body['price'] === undefined || Object.keys(body).length !== 3) {
        return res.status(400).send(badFields)
    }
    if (body['title'].length === '' || body['description'].length === '' || isNaN(body['price']) || Number(body['price']) <= 0) {
        return res.status(400).json(badDataFields)
    }
    if (bookid >= books.length) { return res.status(404).json(outOfErray) }

    books[bookid] = {title: body['title'], description: body['description'], price: Number(body['price'])}
    return res.json(books[bookid])
})

booksRouter.delete('/:bookid', (req, res) => {
    let bookid = Number(req.params.bookid)
    if(!Number.isInteger(bookid) || bookid < 0) { return res.status(400).json(badParametr) }
    if (bookid >= books.length) { return res.status(404).json(outOfErray) }

    books.splice(bookid, 1)
    return res.send('OK')
})
