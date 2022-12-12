const knex = require('./connection');

const createTables = async () => {
    knex.schema.dropTableIfExists('products')
    .then(() => { 

        knex.schema.createTable('products', (table) => {
            table.increments('id').primary();
            table.string('title', 15).notNullable();
            table.string('code', 15).notNullable();
            table.float('price')
            table.integer('stock')
        
        })
        .then(() => console.log('Products CREATED'))
        .catch((err) => console.log('TABLE products error', err))
    })

}

module.exports = createTables;