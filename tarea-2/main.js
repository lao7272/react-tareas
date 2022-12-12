const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;


class Product {
    constructor(id, name, brand, price){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price
    }
    async save(object){
        let data;

        try {
            const res = await fs.promises.readFile('./products.json', 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            console.error(error)
        }

        const arrProd = data ? data : [];
        console.log(arrProd);
        
        const newArrProd = arrProd.find(poke => poke.id == object.id);

        if (newArrProd){
            console.log('Ya existe el producto')
        } else {
            
            arrProd.push(object);
            fs.writeFile("./products.json", JSON.stringify(arrProd), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Producto con id: ${object.id} cargado exitosamente`);
                }
            return object.id
            });
        }
        
    }
    getById(id){
        fs.promises.readFile('./products.json', 'utf8')
    .then(data => {
        const arrProduct = JSON.parse(data);
        const prodId = arrProduct.find(prod => prod.id === id);
        console.log(prodId)
    })
    .catch(err => console.log(err));
    }
    async getAll(){
        const res = await fs.promises.readFile('./products.json', 'utf-8');
        const data = JSON.parse(res);
        console.log(data);
        return data
    }
    async deleteById(id){
        let data;

        try {
            const res = await fs.promises.readFile('./products.json', 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            console.error(error)
        }

        let arrProd = data ? data : [];

        const newArrProd = arrProd.find(poke => poke.id == id);
        if(newArrProd){
            fs.promises.readFile('./products.json', 'utf8')
        .then(data => {
            const arrProduct = JSON.parse(data);
            const newProdArr = arrProduct.filter(prod => prod.id !== id);
            arrProd = newProdArr;
            fs.writeFile("./products.json", JSON.stringify(newProdArr), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Producto eliminado');
                }
            });
        })
        .catch(err => console.log(err));
        } else {
            console.log(`EL producto con id ${id} ha sido eliminado`)
        }
        
        }
    deleteAll(){
        fs.unlink('./products.json', err => console.error(err));
    }
}



// Ejecucion de las funciones

const product1 = new Product(1, 'zapatilla', 'converse', 20000);
const product2 = new Product(2, 'zapatilla', 'nike', 23000);
const product3 = new Product(3, 'zapatilla', 'adidas', 17000);
const product4 = new Product(4, 'zapatilla', 'puma', 18000);
product1.deleteById(4);
// product2.save(product2);
// product3.save(product3);
// product4.save(product4);


// save(product1);
// save(product2);
// save(product3);
// save(product4);

// getById(4);
// getAll();
// deleteById(1)
// deleteAll();


app.get('/', (req, res) =>{
    res.send({message:`Funciona ${PORT}`})
});

app.get('/productos', (req, res) =>{
    const writeProds = async () => {
        const arrProducts = await getAll();
        res.send(arrProducts);
    }
    writeProds();
});

app.get('/productoRandom', (req, res) =>{
    
    const writeProd = async () => {
        const arrProducts = await getAll();
        res.send(arrProducts[Math.floor(Math.random() * arrProducts.length)]);
    }
    writeProd()
});


const server = app.listen(PORT, ()=> {
    console.log(`Server con puerto ${server.address().port} funcionando`)
});