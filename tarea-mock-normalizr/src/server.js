import express from 'express';
import { Server } from 'socket.io';
import { createServer } from "http";
const app = express();

/* CONTAINERS */ 

import FSProduct from './daos/product/FSProduct.js';
const productContainer = new FSProduct();

import FSChat from './daos/chat/FSChat.js';
const chatContainer = new FSChat();

/* NORMALIZR */ 

import { normalizeDb, denormalizeDb, print  } from './containers/Normalizr.js';
import { chatSchema } from './daos/chat/NormalizeChatSchema.js';

/* ROUTERS */ 

import formProductsRouter from './routers/productsRouter.js';
import chatRouter from './routers/chatRouter.js';
import productsTestRouter from './routers/productTestRouter.js';


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));




const httpServer = createServer(app);
const io = new Server(httpServer);


const socketProducts = async () => {

    
    io.on('connection', async (socket) => {
        const dbProducts = await productContainer.getAllProducts();
        const dbMessajes = await chatContainer.getAllChats();
        const normalizedMessages = normalizeDb(dbMessajes, chatSchema);
        const denormalizedMessages = denormalizeDb(normalizedMessages, chatSchema);

        const {compressed, decompressed} = print(normalizedMessages, denormalizedMessages);
        const percentage = (compressed / decompressed) * 100;
        
    
        
        console.log(`Socket id: ${socket.id}`);

        socket.emit('products', dbProducts);
        socket.emit('conversation', {normalizedMessages, percentage});

        socket.on('new-message', async (data) => {
        console.log(data);
        await chatContainer.saveChat(data);
        const newDbMessages = await chatContainer.getAllChats();
        io.sockets.emit('conversation', newDbMessages);
    })
    
    
    });
}
socketProducts();



app.get('/', (req, res) => {
    res.render('pages/index.ejs')
});

app.use('/chat', chatRouter);
app.use('/productos', formProductsRouter); 
app.use('/api', productsTestRouter);

app.all('*', (req, res) => {
    res.render('pages/error.ejs')
})
const port = 8080;
httpServer.listen(port, (err) => {
    if (err) throw new Error(`Error en el servidor ${err}`);
    console.log(`RUNNING http://localhost:${port}`);
});

export default io;
