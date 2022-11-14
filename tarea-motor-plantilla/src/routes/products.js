const { Router } = require("express");
const productsRouter = Router();

const products = [];



productsRouter.get('/', (req, res) => {
    console.log(products)
    res.render('pages/showProducts.ejs', {products})
});

productsRouter.get('/cargar-productos', (req, res) => {
    res.render('pages/form.ejs');
});

productsRouter.post('/', (req, res) => {
    
    products.push(req.body);
    res.redirect('/productos');
});

module.exports = productsRouter;