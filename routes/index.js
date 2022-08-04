import express from 'express';

export const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.send('Hello World!');
})

indexRouter.get('/health', (req, res) => {
    res.send('OK');
})
