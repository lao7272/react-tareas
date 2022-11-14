const express = require('express');
const app = express();

const productsRouter = require('./src/routes/products');

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.set('view engine', 'ejs');

// Funcionalidades


app.use('/productos', productsRouter);

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
});

const PORT = 8080;
app.listen(PORT, (err) => {
    if (err){
        console.error(err);
    }
    console.log(`RUN ${PORT}`);
});

