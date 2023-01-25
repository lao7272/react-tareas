import { MongoDBContainer } from '../../containers/MongoDBContainer.js';
import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    username: {type: String, require: true, max: 100},
    email: {type: String, require: true},
    password: {type: String, require: true}
});
export class User {
    constructor(){
        this.container = new MongoDBContainer('users', UsersSchema);
    }
    async saveUser(object){
        await this.container.save(object);
    }

    async getUserById(id){
        const findObj = await this.container.getById(id);
        if (!findObj){
            console.log(`El id: ${id} del usuario no existe`);
        } else {
            return findObj;
        }
    }
    async getAllUser(){
        const array = await this.container.getAll();
        return array;
    } 
    async updateUser(id, object){
        const findObj = await this.container.getById(id);  
        if (findObj) {
            this.container.update(id, object);
        } else {
            console.log('No se ha encontrado el usuario');
        }
    }
    async deleteUserById(id){
        const findObj = await this.container.getById(id);
        if (findObj) {
            this.container.deleteById(id);
        } else {
            console.log('No se ha encontrado el usuario');
        }  
        }
    deleteAllUser(){
        this.container.deleteAll();
    }
}
export default User;
