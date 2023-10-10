import express from "express";
import cartsRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import viewRouter from './routes/viewsRouter.js';
import chatRouter from './routes/chatRouter.js'
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import __dirname from './utils.js'



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter)






try {
    await mongoose.connect('mongodb+srv://robmrdev:nAjy5as0rvInmwEJ@cluster0.mcrpeik.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)   
}


import http from 'http';
import { createServer } from 'http';
import { Server } from 'socket.io';


const httpServer = app.listen(8080, ()=> console.log('Listening 8080'))

const server = createServer(app);
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



