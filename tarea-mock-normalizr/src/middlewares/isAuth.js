const isAuth = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.redirect("/session/login")
    }
}
export default isAuth;