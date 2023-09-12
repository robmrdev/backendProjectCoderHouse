import express from "express";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";
const cartManager = new CartManager('../carts.json')
const manager = new ProductManager('../products.json');
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import viewRouter from './routes/views.route.js';

import {Server} from 'socket.io'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.listen(8080,()=>{
//     console.log('listening 8080')
// })


const httpServer = app.listen(8080, () => console.log('listening 8080'));
export const socketServer = new Server(httpServer);



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter)






socketServer.on('connection', socket=>{
    console.log('Nuevo cliente');

    // socket.on('updateProducts', products);

    socket.on('message',data=>{
        console.log(data)
    });

    // socket.on('update',)
})

// const server = app.listen(8080, () => console.log('listening 8080'))










app.post('/api/products', async (req, res) => {
    const { title, description, price, thumbmail, code, stock, category, status } = req.body;

    try {
        const result = await manager.addProduct({
            title,
            description,
            price,
            thumbmail,
            code,
            stock,
            category,
            status
        });
        res.status(200).send({ result: result });
        socketServer.emit('result', result)
        
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).send({message:'Error al agregar el producto' });
    }
});

app.get('/api/products', async(req,res)=>{
    const {limit} = req.query
    const products = await manager.getProducts()
    try{
        if(limit){
            const productLimit = products.slice(0, limit)
            res.send({productLimit})
        }
        else{
            res.send({products})
            return
        }
    } catch (error){
        res.status(400).send({message:'Error al agregar el producto' });
    }
    
})

app.get(`/api/products/:pid`, async(req,res)=>{
    
    const pid= parseInt(req.params.pid)
    const productsById = await manager.getProductsById(pid)
    if (productsById === "Not Found") {
        res.status(404).send({ error: 'Id Not Found' });
    } else {
        res.status(200).send(productsById)
    }

})

app.put('/api/products/:pid', async(req,res)=>{
    const pid= parseInt(req.params.pid);
    const { title, description, price, thumbmail, code, stock, category, status } = req.body;

    try {
        const result = await manager.updateProduct({
            id: pid,
            title,
            description,
            price,
            thumbmail,
            code,
            stock,
            category,
            status
        });
        res.status(200).send({ message: result });
    } catch (error) {
        res.status(500).send({ error: 'Error on update Product' });
    }
});

app.delete('/api/products/:pid', async(req,res)=>{
    const pid= parseInt(req.params.pid)
    try{
        const result = await manager.deleteProduct(pid)
        res.status(400).send({ message: result });

        socketServer.emit('result', result)
    } catch (error){
        res.status(500).send({ error: 'Error on Delete Product' });
    }
})



app.post('/api/carts', async (req, res) => {
    try {
        const result = await cartManager.addCart({ products: [] });
        res.status(201).send({ message: result });
    } catch (error) {
        console.error('Error al crear un carrito:', error);
        res.status(500).send({ error: 'Error al crear un carrito' });
    }
});

app.get('/api/carts/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    try {
        const cart = await cartManager.getCartById(cid);
        if (cart === "Not Found") {
            res.status(404).send({ error: `Carrito con ID ${cid} no encontrado` });
        } else {
            res.status(200).send(cart.products);
        }
    } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
        res.status(500).send({ error: 'Error al obtener productos del carrito' });
    }
});

app.post('/api/carts/:cid/products/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const { quantity } = req.body;

    try {
        const product = { product: { id: pid }, quantity: quantity || 1 };
        const result = await cartManager.addProductToCart(cid, product);


        
        const productsById = await manager.getProductsById(pid)
        if (productsById === "Not Found") {
            res.status(404).send({ error: 'Id Not Found' });
        } 



        if (result.startsWith('Cart with ID') || result === 'addProductToCart fails') {
            res.status(404).send({ error: result });
        } else {
            res.status(200).send({ message: result });
        }
    } catch (error) {
        console.error('Error al agregar un producto al carrito:', error);
        res.status(500).send({ error: 'Error al agregar un producto al carrito' });
    }
});

// app.get('/:cid', async(req,res)=>{
//     const cid= parseInt(req.params.cid)
//     try{
//         const cartsById = await cartManager.getCartById(cid)
//         res.send(cartsById)
//     }
//     catch (error) {
//         res.status(500).send({message:'Error on getting Cart' });
//     }
// })

// app.post('/:cid/product/:pid', async (req,res)=>{
//     const cid= parseInt(req.params.cid)
//     const pid= parseInt(req.params.pid)

//     try{
//         const cartById = await cartManager.getCartById(cid)
//         cartById.map

//     }
//     catch (error) {
//         res.status(500).send({message:'Error on Adding Product to cart' });
//     }
// })








// import express from "express";
// import productManager from "../managers/productManager.js";


// const manager = new productManager('../products.txt') 
// const app = express();

// app.get('/products', async(req,res)=>{
//     const {limit} = req.query
//     const products = await manager.getProducts()
//     if(limit){
//         const productLimit = products.slice(0, limit)
//         res.send({productLimit})
//         return
//     }
//     else{
//         res.send({products})
//     }
    
// })

// app.get('/products/:pid', async(req,res)=>{
//     const pid= parseInt(req.params.pid)
//     const productsById = await manager.getProductsById(pid)
//         res.send(productsById)
// })

// app.listen(8080,()=>{
//     console.log('listening 8080')
// })