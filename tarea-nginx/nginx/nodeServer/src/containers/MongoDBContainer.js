import mongoose from 'mongoose';
export class MongoDBContainer {
    constructor(collectionName, schema){
        this.collection = mongoose.model(collectionName, schema);
    }

    async CRUD () {
        try {
            const URL = 'mongodb://127.0.0.1:27017/ecommerce'
            let res =  mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            });
            console.log("MONGO DB conectado");
        } catch (error) {
            console.log('Ocurrio un error', error);
        }
    }
    
    /* CREATE */

    async save(object){
        this.CRUD();
        try {
            const objectSavedModel = await this.collection.create(object);
            let productSaved = await objectSavedModel.save();
            console.log(productSaved);            
        } catch (error) {
            console.log('Error: Ocurrio un error', error);
            
        }
    }

    /* UPDATE */

    async update(id, object){
        this.CRUD();
        try {
            await this.collection.updateOne({_id: id}, {$set: object});
        } catch (error) {
            console.log(error)
        }
    }

    /* READ */

    async getAll(){
        this.CRUD();
        try {
            const data = await this.collection.find({});
            return data;
        } catch (error) {
            console.log(error,'Ocurrio un error')
        }
    }
    async getById(id){
        this.CRUD();
        try {
            const findId = await this.collection.findOne({_id: id }); 
            return findId;
        } catch (error) {
            console.log('Error: Objeto no encontrado');
        }
        }

    /* DELETE */
    async deleteById(id){
        this.CRUD();
        try {
            const deleteById = await this.collection.deleteOne({_id: id }); 
            return deleteById;
        } catch (error) {
            console.log('Error: Objeto no encontrado');
        }
    }
    async deleteAll(){
        this.CRUD();
        await this.collection.deleteMany({}); 
    }

}
