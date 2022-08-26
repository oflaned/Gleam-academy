import FileStore from 'session-file-store'
import session from 'express-session'

let fileStore = new FileStore(session)

export const sessionConfig = {
    store: new fileStore,
    secret: 'some secret',
    rolling: true,
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}
