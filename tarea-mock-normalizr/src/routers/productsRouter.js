import { Router } from 'express';

import isAuth from '../middlewares/isAuth.js';
import FSProduct from '../daos/product/FSProduct.js';
import { logger } from '../logs/log4js.js';
const formProductsRouter = Router();
const productContainer = new FSProduct();


formProductsRouter.get('/', isAuth, async (req, res) => {
    try {
        const dbProducts = await productContainer.getAllProducts() ?? [];
        const sessionName = req.session.passport ? req.session.passport.user.username : "";
        res.render('pages/showProducts.ejs', {dbProducts, sessionName});
    } catch (error) {
        logger.error(error);
        res.render('pages/error.ejs');
    }
});

formProductsRouter.get('/cargar-productos', isAuth, async (req, res) => {
    try {
        const dbProducts = await productContainer.getAllProducts() ?? [];
        const sessionName = req.session.passport ? req.session.passport.user.username : "";
        res.render('pages/form.ejs', {dbProducts, sessionName});
    } catch (error) {
        logger.error(error);
        res.render('pages/error.ejs');
    }
});

formProductsRouter.post('/cargar-productos', async (req, res) => {
    const {name, price, urlImg} = req.body;
    const pruduct = {name, price, urlImg};
    await productContainer.saveProduct(pruduct);

    res.redirect('cargar-productos');
});
    

    


export default  formProductsRouter;