import { faker } from '@faker-js/faker';
import { Router } from 'express';
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

productsTestRouter.get('/producto-test', async (req, res) => {
    const dbProducts = [];
    createProducts(dbProducts);
    const sessionName = req.session.user ?? "";

    res.render('pages/testProducts.ejs', {dbProducts, sessionName});
});


    

    


export default  productsTestRouter;