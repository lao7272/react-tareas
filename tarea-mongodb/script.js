
/* 1-, 2-, 3- */
 /* use ecommerce; */

db.products.insertMany([
    {name: 'Coca Cola', price: 220},
    {name: 'Cuadro', price: 4100},
    {name: 'Auriculares', price: 4900},
    {name: 'Block de notas', price: 500},
    {name: 'Cargador iphone', price: 3500},
    {name: 'Luces led', price: 2300},
    {name: 'Escoba', price: 1900},
    {name: 'Mochila', price: 3700},
    {name: 'Fanta', price: 210},
    {name: 'Doritos', price: 300}
]);


/* 4- */
db.products.estimatedDocumentCount();


/* 5- */
    /* a- */
    db.products.insertOne({name: 'Short', price: 2900});

    /* b-, */

        /* I- */
        db.products.find({price: {$lt: 1000}});

        //* II- */
        db.products.find({price: {$gt: 1000, $lt: 3000}}).sort({price: 1});

        /* III- */
        db.products.find({price: {$gt: 3000}});

        /* IV- */
        db.products.find({},{name: 1}).skip(2).limit(1).sort({price: 1});



    /* c- */
    db.products.updateMany({},{$set: {stock: 100}},{$upsert: true});


    /* d- */
    db.products.updateMany({price: {$gt: 4000}},{$set: {stock: 0}});


    /* e- */
    db.products.deleteMany({price: {$lt: 1000}});


/* 6 */
db.createUser(
    {
        user: 'pepe',
        pwd: 'asd456',
        roles: [
            {
                role: 'read',
                db: 'ecommerce'
            }
        ]
});

