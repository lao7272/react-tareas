import { Router } from 'express';
import {cpus} from "os"
const infoRouter = Router();



infoRouter.get("/", (req, res) => {
    const data = {
        pid: process.pid,
        executedPath: process.execPath,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        actualDir: process.cwd(),
        operativeSyst: process.platform,
        processesNumber: cpus().length
    }

    res.render('pages/info.ejs', {data})
});
export default infoRouter;
