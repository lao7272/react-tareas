import { Router } from 'express';
import compression from "compression";
const infoRouter = Router();



infoRouter.get("/comprimido", compression(),(req, res) => {
    const data = {
        pid: process.pid,
        executedPath: process.execPath,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        actualDir: process.cwd(),
        operativeSyst: process.platform
    }
    console.log(data);

    res.render('pages/info.ejs', {data})
});
infoRouter.get("/sin-comprimir", (req, res) => {
    const data = {
        pid: process.pid,
        executedPath: process.execPath,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        actualDir: process.cwd(),
        operativeSyst: process.platform
    }

    res.render('pages/info.ejs', {data})
});
export default infoRouter;
