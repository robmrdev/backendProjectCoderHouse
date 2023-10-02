import express from "express";
import cartsRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import viewRouter from './routes/viewsRouter.js';
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import __dirname from './utils.js'



// import ProductManager from "./dao/fileManagers/productManager.js";
// import CartManager from "./dao/fileManagers/cartManager.js";
// const cartManager = new CartManager('../carts.json')
// const manager = new ProductManager('../products.json');
// import {Server} from 'socket.io'



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);






try {
    await mongoose.connect('mongodb+srv://robmrdev:nAjy5as0rvInmwEJ@cluster0.mcrpeik.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)   
}
app.listen(8080, ()=>console.log('Server Running'))


import http from 'http';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server);


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







// app.get('/api/products', async(req,res)=>{
//     const {limit} = req.query
//     const products = await manager.getProducts()
//     try{
//         if(limit){
//             const productLimit = products.slice(0, limit)
//             res.send({productLimit})
//         }
//         else{
//             res.send({products})
//             return
//         }
//     } catch (error){
//         res.status(400).send({message:'Error al agregar el producto' });
//     }
    
// })

// app.get(`/api/products/:pid`, async(req,res)=>{
    
//     const pid= parseInt(req.params.pid)
//     const productsById = await manager.getProductsById(pid)
//     if (productsById === "Not Found") {
//         res.status(404).send({ error: 'Id Not Found' });
//     } else {
//         res.status(200).send(productsById)
//     }

// })

// app.put('/api/products/:pid', async(req,res)=>{
//     const pid= parseInt(req.params.pid);
//     const { title, description, price, thumbnail, code, stock, category, status } = req.body;

//     try {
//         const result = await manager.updateProduct({
//             id: pid,
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock,
//             category,
//             status
//         });
//         res.status(200).send({ message: result });
//     } catch (error) {
//         res.status(500).send({ error: 'Error on update Product' });
//     }
// });

// app.delete('/api/products/:pid', async(req,res)=>{

//     const pid= parseInt(req.params.pid)

//     try{

//         const result = await manager.deleteProduct(pid)

//         const products = await manager.getProducts()

//         socketServer.emit('updateProducts', products)

//         res.status(200).send({ message: result });

//     } catch (error){

//         res.status(500).send({ error: 'Error on Delete Product' });

//     }

// })



// app.post('/api/carts', async (req, res) => {
//     try {
//         const result = await cartManager.addCart({ products: [] });
//         res.status(201).send({ message: result });
//     } catch (error) {
//         console.error('Error al crear un carrito:', error);
//         res.status(500).send({ error: 'Error al crear un carrito' });
//     }
// });

// app.get('/api/carts/:cid', async (req, res) => {
//     const cid = parseInt(req.params.cid);
//     try {
//         const cart = await cartManager.getCartById(cid);
//         if (cart === "Not Found") {
//             res.status(404).send({ error: `Carrito con ID ${cid} no encontrado` });
//         } else {
//             res.status(200).send(cart.products);
//         }
//     } catch (error) {
//         console.error('Error al obtener productos del carrito:', error);
//         res.status(500).send({ error: 'Error al obtener productos del carrito' });
//     }
// });

// app.post('/api/carts/:cid/products/:pid', async (req, res) => {
//     const cid = parseInt(req.params.cid);
//     const pid = parseInt(req.params.pid);
//     const { quantity } = req.body;

//     try {
//         const product = { product: { id: pid }, quantity: quantity || 1 };
//         const result = await cartManager.addProductToCart(cid, product);


        
//         const productsById = await manager.getProductsById(pid)
//         if (productsById === "Not Found") {
//             res.status(404).send({ error: 'Id Not Found' });
//         } 



//         if (result.startsWith('Cart with ID') || result === 'addProductToCart fails') {
//             res.status(404).send({ error: result });
//         } else {
//             res.status(200).send({ message: result });
//         }
//     } catch (error) {
//         console.error('Error al agregar un producto al carrito:', error);
//         res.status(500).send({ error: 'Error al agregar un producto al carrito' });
//     }
// });













// import express from "express";
// import ProductManager from "./dao/fileManagers/productManager.js";
// import CartManager from "./dao/fileManagers/cartManager.js";
// const cartManager = new CartManager('../carts.json')
// const manager = new ProductManager('../products.json');
// import handlebars from 'express-handlebars';
// import __dirname from './utils.js'
// import viewRouter from './routes/viewsRouter.js';
// import {Server} from 'socket.io'

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));


// const httpServer = app.listen(8080, () => console.log('listening 8080'));
// export const socketServer = new Server(httpServer);



// app.engine('handlebars', handlebars.engine());
// app.set('views', __dirname + '/views');
// app.set('view engine', 'handlebars');
// app.use(express.static(__dirname + '/public'))
// app.use('/', viewRouter)


// socketServer.on('connection', socket=>{
//     console.log('Nuevo cliente');


//     socket.on('message',data=>{
//         console.log(data)
//     });

// })


// app.post('/api/products', async (req, res) => {
//     const { title, description, price, thumbnail, code, stock, category, status } = req.body;

//     try {
//         const result = await manager.addProduct({
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock,
//             category,
//             status
//         });

//         const products = await manager.getProducts()
//         socketServer.emit('updateProducts', products)
        
//     } catch (error) {
//         console.error('Error al agregar el producto:', error);
//         res.status(500).send({message:'Error al agregar el producto' });
//     }
// });

// app.get('/api/products', async(req,res)=>{
//     const {limit} = req.query
//     const products = await manager.getProducts()
//     try{
//         if(limit){
//             const productLimit = products.slice(0, limit)
//             res.send({productLimit})
//         }
//         else{
//             res.send({products})
//             return
//         }
//     } catch (error){
//         res.status(400).send({message:'Error al agregar el producto' });
//     }
    
// })

// app.get(`/api/products/:pid`, async(req,res)=>{
    
//     const pid= parseInt(req.params.pid)
//     const productsById = await manager.getProductsById(pid)
//     if (productsById === "Not Found") {
//         res.status(404).send({ error: 'Id Not Found' });
//     } else {
//         res.status(200).send(productsById)
//     }

// })

// app.put('/api/products/:pid', async(req,res)=>{
//     const pid= parseInt(req.params.pid);
//     const { title, description, price, thumbnail, code, stock, category, status } = req.body;

//     try {
//         const result = await manager.updateProduct({
//             id: pid,
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock,
//             category,
//             status
//         });
//         res.status(200).send({ message: result });
//     } catch (error) {
//         res.status(500).send({ error: 'Error on update Product' });
//     }
// });

// app.delete('/api/products/:pid', async(req,res)=>{

//     const pid= parseInt(req.params.pid)

//     try{

//         const result = await manager.deleteProduct(pid)

//         const products = await manager.getProducts()

//         socketServer.emit('updateProducts', products)

//         res.status(200).send({ message: result });

//     } catch (error){

//         res.status(500).send({ error: 'Error on Delete Product' });

//     }

// })



// app.post('/api/carts', async (req, res) => {
//     try {
//         const result = await cartManager.addCart({ products: [] });
//         res.status(201).send({ message: result });
//     } catch (error) {
//         console.error('Error al crear un carrito:', error);
//         res.status(500).send({ error: 'Error al crear un carrito' });
//     }
// });

// app.get('/api/carts/:cid', async (req, res) => {
//     const cid = parseInt(req.params.cid);
//     try {
//         const cart = await cartManager.getCartById(cid);
//         if (cart === "Not Found") {
//             res.status(404).send({ error: `Carrito con ID ${cid} no encontrado` });
//         } else {
//             res.status(200).send(cart.products);
//         }
//     } catch (error) {
//         console.error('Error al obtener productos del carrito:', error);
//         res.status(500).send({ error: 'Error al obtener productos del carrito' });
//     }
// });

// app.post('/api/carts/:cid/products/:pid', async (req, res) => {
//     const cid = parseInt(req.params.cid);
//     const pid = parseInt(req.params.pid);
//     const { quantity } = req.body;

//     try {
//         const product = { product: { id: pid }, quantity: quantity || 1 };
//         const result = await cartManager.addProductToCart(cid, product);


        
//         const productsById = await manager.getProductsById(pid)
//         if (productsById === "Not Found") {
//             res.status(404).send({ error: 'Id Not Found' });
//         } 



//         if (result.startsWith('Cart with ID') || result === 'addProductToCart fails') {
//             res.status(404).send({ error: result });
//         } else {
//             res.status(200).send({ message: result });
//         }
//     } catch (error) {
//         console.error('Error al agregar un producto al carrito:', error);
//         res.status(500).send({ error: 'Error al agregar un producto al carrito' });
//     }
// });
