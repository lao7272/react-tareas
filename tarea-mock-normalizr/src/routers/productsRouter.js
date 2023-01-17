import { Router } from 'express';
const formProductsRouter = Router();

import FSProduct from '../daos/product/FSProduct.js';
// import { Product } from '../daos/product/MongoDBProduct.js';
const productContainer = new FSProduct();


formProductsRouter.get('/', async (req, res) => {
    const dbProducts = await productContainer.getAllProducts() ?? [];
    const sessionName = req.session.user;
    res.render('pages/showProducts.ejs', {dbProducts, sessionName});
});

formProductsRouter.get('/cargar-productos', async (req, res) => {
    const dbProducts = await productContainer.getAllProducts() ?? [];
    const sessionName = req.session.user;
    res.render('pages/form.ejs', {dbProducts, sessionName});
});

formProductsRouter.post('/cargar-productos', async (req, res) => {
    const {name, price, urlImg} = req.body;
    console.log('req body: ', req.body);
    const pruduct = {name, price, urlImg};
    await productContainer.saveProduct(pruduct);

    res.redirect('cargar-productos');
});
    

    


export default  formProductsRouter;