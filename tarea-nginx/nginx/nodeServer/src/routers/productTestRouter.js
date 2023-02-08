import { Router } from 'express';
import { faker } from '@faker-js/faker';

import isAuth from '../middlewares/isAuth.js';

const productsTestRouter = Router();

faker.locale = 'en_US';

const createRandomProduct = () => {
    const randomProduct = {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        urlImg: faker.image.business()
    };
    return randomProduct;
}

const createProducts = (array) => {
    for (let i = 0; i < 5; i++) {
        const product = createRandomProduct();
        array.push(product);
    }
}

productsTestRouter.get('/producto-test', isAuth, async (req, res) => {
    const dbProducts = [];
    createProducts(dbProducts);
    const sessionName = req.session.passport ? req.session.passport.user.username : "";

    res.render('pages/testProducts.ejs', {dbProducts, sessionName});
});


export default  productsTestRouter;