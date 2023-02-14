import { logger } from "../logs/log4js.js";
const infoReq = (req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    logger.info(`Datos de la pagina: URL: ${fullUrl}, METODO: ${req.method}`);
    next();
}
export default infoReq;