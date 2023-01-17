import { Router } from "express";

const loginRouter = Router();

loginRouter.get('/login', (req, res) => {
    const sessionName = req.session.user ?? "";
    res.render('pages/login.ejs', {sessionName});
});

loginRouter.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        res.status(401).send('ERROR: No se han cargado todos campos');
    }
    req.session.user = username;
    req.session.password = password;
    req.session.email = email;
    res.redirect('/');
});

loginRouter.get('/logout',async (req, res) => {
    const sessionName = req.session.user;
    req.session.destroy(err => {
        if(!err){
            res.render('pages/logout.ejs',{sessionName});
        } else {
            res.json({status: "logout error", body: err})
        }
    });
});

export default loginRouter;