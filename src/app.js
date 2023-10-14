import express from "express";
import cartsRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import viewRouter from './routes/viewsRouter.js';
import chatRouter from './routes/chatRouter.js'
import sessionsRouter from './routes/sessionRouter.js'
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import __dirname from './utils.js'
import session from "express-session";;
import MongoStore from "connect-mongo";

import { createServer } from 'http';
import { Server } from 'socket.io';

// import ProductManager from "./dao/fileManagers/productManager.js";
// import CartManager from "./dao/fileManagers/cartManager.js";
// const cartManager = new CartManager('../carts.json')
// const manager = new ProductManager('../products.json');
// import {Server} from 'socket.io'


const app = express();

try {
    await mongoose.connect('mongodb+srv://robmrdev:nAjy5as0rvInmwEJ@cluster0.mcrpeik.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)   
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder47300',
    resave: true,
    saveUninitialized: true,

}))


app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/chat', chatRouter)
app.use('/api/sessions', sessionsRouter)










const httpServer = app.listen(8080, ()=> console.log('Listening 8080'))

const io = new Server(httpServer);


let messages =[];

io.on('connection', socket=>{
    console.log('New Client Connected')

    socket.on('authenticate', ()=>{
        socket.emit('messageLog', messages);
    })

    socket.on('message', data=>{
        messages.push(data);
        io.emit('messageLog', messages)

    })

    socket.broadcast.emit('userConnected',{user: 'Nuevo usuario Conectado'})
})


