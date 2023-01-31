import { Router } from "express";
import { fork } from 'child_process';


const randomRouter = Router();

randomRouter.get("/", (req, res) => {
    const forked = fork("./src/functions/calculate.js" )
    const quant = parseInt(req.query.cant);
    forked.send(quant);
    forked.on("message", (msg) => {
        res.render("pages/random.ejs", {msg})
    })

});

export default randomRouter;