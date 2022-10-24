const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;
let arrProd = [];
//Clase Producto
class Product {
    constructor(id, name, brand, price){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price
    }
}

// Funciones de FS
const save = (object) => {
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

const getById = (id) => {
    fs.promises.readFile('./products.json', 'utf8')
    .then(data => {
        const arrProduct = JSON.parse(data);
        const prodId = arrProduct.find(prod => prod.id === id);
        console.log(prodId)
    })
    .catch(err => console.log(err));
};

const getAll = async () => {
    const res = await fs.promises.readFile('./products.json', 'utf-8');
    const data = JSON.parse(res);
    console.log(data);
    return data
};
const deleteById = (id) => {
    
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
};

const deleteAll = () => {
    fs.unlink('./products.json', err => console.error(err));
    arrProd = [];
    // fs.writeFile("./products.json", JSON.stringify([]), 'utf-8', err => console.log(err))
};



// Ejecucion de las funciones

const product1 = new Product(1, 'zapatilla', 'converse', 20000);
const product2 = new Product(2, 'zapatilla', 'nike', 23000);
const product3 = new Product(3, 'zapatilla', 'adidas', 17000);
const product4 = new Product(4, 'zapatilla', 'puma', 18000);

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