export const error = (err, req, res, next) => {
    if (err.statusCode === 401) {
        return res.render('./../views/pages/auth/login.ejs', {
            message: err.message,
        })
    }
    if (err.statusCode !== undefined) {
        return res.status(err.statusCode).render('error', {
            error: err,
        })
    }
    console.error(err)
    return res.status(500).send('Something broke!')
}
