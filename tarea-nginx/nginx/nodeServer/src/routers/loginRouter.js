import { Router } from "express";
import passport from "passport";

const loginRouter = Router();

// REGISTER

loginRouter.get('/registrar', async (req, res) => {

    res.render('pages/register.ejs');
});

loginRouter.post('/registrar', passport.authenticate("register",
    {
        failureRedirect: "/session/errorAlregistrar",
        successRedirect: "/"
    }
));

loginRouter.get('/errorAlregistrar', (req, res) => {
    res.render('pages/failRegister.ejs');
});

// LOGIN

loginRouter.post('/login', passport.authenticate("login",
    {
        failureRedirect: "/session/errorAlLogear",
        successRedirect: "/"
    }
));

loginRouter.get('/login', (req, res) => {
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    res.render('pages/login.ejs', {sessionName});
});


loginRouter.get('/errorAlLogear', (req, res) => {
    res.render('pages/failLogin.ejs');
});

// LOGOUT

loginRouter.get('/logout', async (req, res) => {
    const sessionName = req.session.passport.user.username ?? "";
    req.logout(function(err) {
        if (err) { return next(err); }
        res.render('pages/logout.ejs',{sessionName});
    });
    // req.session.destroy(err => {
    //     if(!err){
    //         res.render('pages/logout.ejs',{sessionName});
    //     } else {
    //         res.json({status: "logout error", body: err})
    //     }
    // });
});


export default loginRouter;