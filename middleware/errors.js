export const error = (err, req, res, next) => {
    if (err.statusCode !== undefined) {
        return res.status(err.statusCode).render('error', {
            error: err
        })
    }
    console.error(err.stack)
    return res.status(500).send('Something broke!')
    
}
