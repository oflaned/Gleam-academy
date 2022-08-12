let books = [
    {
        title: 'Book1',
        description: 'keksh',
        price: 100
    }
]

export function lengthOfBooks(){
    return books.length
}

export async function get() {
    return books
}

export async function getBook(bookId) {
    return books[bookId]
}

export async function post(book) {
    books.push(book)
    return book
}

export async function put(book, bookId) {
    books[bookId] = book
    return book
}

export async function patch(book, bookId) {
    Object.assign(books[bookId], book)
    return books[bookId]
}

export async function del(bookId) {
    books.splice(bookId, 1)
    return "OK"
}