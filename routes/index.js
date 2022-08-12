import express from 'express';

export const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.render('pages/index')
})

indexRouter.get('/health', (req, res) => {
    res.send('OK')
})
