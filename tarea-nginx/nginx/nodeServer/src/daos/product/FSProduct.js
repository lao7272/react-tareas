
import FSContainer from '../../containers/FSContainer.js';
export default class FSProduct {
    constructor(timestamp, name, description, urlImg, price){
        this.name = name;
        this.timestamp = timestamp;
        this.description = description;
        this.urlImg = urlImg;
        this.price = price;
        this.container = new FSContainer('products.json');
    }
    async saveProduct(object){
            this.container.save(object);        
    }
    async getProductById(id){
        
            const productId = await this.container.getById(id);
            console.log(productId)
            return productId;
        
    }
    async updateProduct(id, object){
        const productArray = await this.container.getAll() ?? [];  
        const findProduct = productArray.find(prod => prod.id == object.id);
        if (findProduct) {
            this.container.update(id, object);
        } else {
            console.log('No se ha encontrado tu producto');
        }
    }
    async getAllProducts(){
        const productArray = await this.container.getAll() ?? [];  
        return productArray;
    } 
    async deleteProductById(id){
            this.container.deleteById(id); 
        }
    deleteAllProducts(){
        this.container.deleteAll();
    }
}


