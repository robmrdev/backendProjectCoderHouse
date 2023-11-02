import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import {__dirname} from './utils.js';
import cartsRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import viewRouter from './routes/viewsRouter.js';
import chatRouter from './routes/chatRouter.js'
import sessionsRouter from './routes/sessionRouter.js'
import authRouter from './routes/auth.router.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";



const app = express();

try {
    await mongoose.connect('mongodb+srv://robmrdev:nAjy5as0rvInmwEJ@cluster0.mcrpeik.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)   
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder47300',
    resave: true,
    saveUninitialized: true,
}))


initializePassport();
app.use(passport.initialize())
// app.use(passport.session())

app.use('/', viewRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/chat', chatRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/auth', authRouter)

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


