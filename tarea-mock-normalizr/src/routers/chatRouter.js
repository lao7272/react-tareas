import { Router } from "express";
export const chatRouter = Router();

chatRouter.get('/', async (req, res) => {
    const sessionName = req.session.user ?? "";
    res.render('pages/chat.ejs', {sessionName});
});

export default chatRouter;
