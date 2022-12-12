const knex = require('knex')({
    client: 'mysql',
    connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'ecommerce'
    }
});

module.exports = knex;
// const getUsers = async () => {
//     const res = await knex('users');
//     console.log({res});
// }
// getUsers();

// knex('users')
// .where({name: 'martina'})
// .then(rows => console.log({rows}))
// .finally(() => {
//      knex.destroy();
//})


//DOCUMENTACION: https://devhints.io/knex
//node database/connection