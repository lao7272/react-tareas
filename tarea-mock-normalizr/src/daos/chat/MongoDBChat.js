import { MongoDBContainer } from '../../containers/MongoDBContainer.js';
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    author:{
        id: {type: String, require: true},
        name: {type: String, require: true, max: 100},
        lastname: {type: String, require: true, max: 100},
        age: {type: Number, require: true},
        nickname: {type: String, require: true, max: 100},
        urlImg: {type: String, require: true},
    },
    dateMessage: {type: String, require: true},
    message: {type: String, require: true}
    
});


export class Chat {
    constructor(){
        this.container = new MongoDBContainer('chat', chatSchema)
    }
    async saveChat(object){
        await this.container.save(object);
    }

    async getChatById(id){
        const chatId = await this.container.getById(id);
        if (!chatId){
            console.log(`El id: ${id} de este chat no existe`);
        } else {
            return chatId;
        }
    }
    async getAllChats(){
        const chatArray = await this.container.getAll();
        return chatArray;
    } 

  
}


