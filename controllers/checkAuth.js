export const checkAuth = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/auth/login')
}
