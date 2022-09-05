import FileStore from 'session-file-store'
import session from 'express-session'
import dot from 'dotenv'

dot.config()

let fileStore = new FileStore(session)
const secret = process.env.SECRET ? process.env.SECRET : 'secret'

export const sessionConfig = {
    store: new fileStore(),
    secret: 'some secret',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
}
