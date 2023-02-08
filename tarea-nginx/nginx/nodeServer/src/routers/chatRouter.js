import { Router } from "express";
import isAuth from '../middlewares/isAuth.js';
export const chatRouter = Router();

chatRouter.get('/', isAuth, async (req, res) => {
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    res.render('pages/chat.ejs', {sessionName});
});

export default chatRouter;
