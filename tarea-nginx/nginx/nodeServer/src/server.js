import express from 'express';
import session from 'express-session';

import passport from 'passport';
import { Strategy } from 'passport-local';

import { Server } from 'socket.io';
import { createServer } from "http";

import MongoStore from 'connect-mongo';

import vars from './args/config.js';

import bcrypt from 'bcrypt';

import cluster from 'cluster';
import os from "os";


/* CONTAINERS */ 

import User from './daos/users/MongoDBUsers.js';
const DBUsers = new User();

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
import loginRouter from './routers/loginRouter.js';
import infoRouter from './routers/infoRouter.js';
import randomRouter from './routers/randomRouter.js';

const { PORT, MONGO_STORE_URL } = vars;

const clusterMode = process.argv[3] === "CLUSTER";




if (clusterMode && cluster.isPrimary) {
    const numCPUs = os.cpus().length
    console.log(`PID MASTER ${process.pid}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    })
} else {
    
    const app = express();  
    
    
    /* PASSPORT CONFIG */ 
    
    passport.use('register', new Strategy (
        { passReqToCallback: true }, 
        async (req, username, password, done) => {
        const { email } = req.body;
        
        const db = await DBUsers.getAllUser();
        const findUser = db.find(obj =>  obj.username === username && obj.email === email );
        const comparedPassword = findUser ?  await bcrypt.compare(password, findUser.password) : "";
        if (findUser && comparedPassword) {
            return done('Already registered')
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user =  {
            username,
            password: hashedPassword,
            email
        };
    
        await DBUsers.saveUser(user);
        
        const getDb = await DBUsers.getAllUser()
        const getUserWithId = getDb.find(obj =>  obj.email == email && obj.password === hashedPassword && obj.username === username ); 
    
        return done(null, getUserWithId)
    
    }));
    
    passport.use('login', 
    new Strategy({
        usernameField: "email",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const db =  await DBUsers.getAllUser();
        const findUser = db.find(obj => obj.email === email);
        
        if (!findUser) {
            return done(null, false)
        }
    
        const comparedPassword = findUser ? await bcrypt.compare(password, findUser.password) : "";
    
        if (!comparedPassword) {
            return done(null, false)
        }
    
    
        return done(null, findUser)
    }));
    
    // SERIALIZE & DESERIALIZE
    
    passport.serializeUser(function(user, done) {
        const { _id, username } = user;
        const newUser = { _id, username } 
        done(null, newUser);
    });
    passport.deserializeUser(async function(obj, done) {
        
        const user = await DBUsers.getUserById(obj._id);
        done(null, user);
    });
    
    
    /* --------------------------------------------------------------------------- */
    
    app.use(
        
        session({
            store: MongoStore.create({
                mongoUrl: MONGO_STORE_URL,
                ttl: 600
            }),
            secret: 'shhh',
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 600000
            }
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    // app.set('view engine', 'ejs');
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    
    
    
    /* WEBSOCKET */ 
    
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
    
    /* ------------------------------------------------------ */ 
    
    app.get('/', (req, res) => {
        const sessionName = req.session.passport ? req.session.passport.user.username : "";
    
        res.render('pages/index.ejs', {sessionName});
    });
    
    app.use('/chat', chatRouter);
    app.use('/productos', formProductsRouter); 
    app.use('/api', productsTestRouter,);
    app.use('/session', loginRouter);
    app.use("/info", infoRouter);
    app.use("/random", randomRouter);
    
    app.all('*', (req, res) => {
        res.render('pages/error.ejs')
    });

    httpServer.listen(PORT, (err) => {
        if (err) throw new Error(`Error en el servidor ${err}`);
        console.log(`RUNNING http://localhost:${PORT}`);
    });
    
}    


