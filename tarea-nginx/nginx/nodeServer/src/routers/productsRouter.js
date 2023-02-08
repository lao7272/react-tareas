import { Router } from 'express';

import isAuth from '../middlewares/isAuth.js';
import FSProduct from '../daos/product/FSProduct.js';
const formProductsRouter = Router();
const productContainer = new FSProduct();


formProductsRouter.get('/', isAuth, async (req, res) => {
    const dbProducts = await productContainer.getAllProducts() ?? [];
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    res.render('pages/showProducts.ejs', {dbProducts, sessionName});
});

formProductsRouter.get('/cargar-productos', isAuth, async (req, res) => {
    const dbProducts = await productContainer.getAllProducts() ?? [];
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    res.render('pages/form.ejs', {dbProducts, sessionName});
});

formProductsRouter.post('/cargar-productos', async (req, res) => {
    const {name, price, urlImg} = req.body;
    const pruduct = {name, price, urlImg};
    await productContainer.saveProduct(pruduct);

    res.redirect('cargar-productos');
});
    

    


export default  formProductsRouter;