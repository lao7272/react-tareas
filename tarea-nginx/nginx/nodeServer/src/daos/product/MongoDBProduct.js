import { MongoDBContainer } from '../../containers/MongoDBContainer.js';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    urlImg: {type: String, require: true}
});
export class Product {
    constructor(){
        this.container = new MongoDBContainer('products', ProductSchema);
    }
    async saveProduct(object){
        await this.container.save(object);
    }

    async getProductById(id){
        const productId = await this.container.getById(id);
        if (!productId){
            console.log(`El id: ${id} de este producto no existe`);
        } else {
            return productId;
        }
    }
    async getAllProducts(){
        const productArray = await this.container.getAll();
        return productArray;
    } 
    async updateProduct(id, object){
        const findProduct = await this.container.getById(id);  
        if (findProduct) {
            this.container.update(id, object);
        } else {
            console.log('No se ha encontrado tu producto');
        }
    }
    async deleteProductById(id){
        const findProduct = await this.container.getById(id);
        if (findProduct) {
            this.container.deleteById(id);
        } else {
            console.log('No se ha encontrado tu producto');
        }  
        }
    deleteAllProducts(){
        this.container.deleteAll();
    }
}

