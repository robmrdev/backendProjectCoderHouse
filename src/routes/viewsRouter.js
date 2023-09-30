import express from "express"
import { urlencoded } from "express";
import ProductManager from "../dao/fileManagers/productManager.js";
// import { socketServer } from "../app.js";


import { Router } from "express";
import CartDBManager from "../dao/dbManagers/cartManager.js";
import ProductDBManager from "../dao/dbManagers/productManager.js";

const router = Router()

const productManager = new ProductDBManager();

router.get('/realTimeProducts', async (req,res)=>{
    try {
        // const user = await productManager.getAll()
        // res.render('realTimeProducts', {user})
        // console.log(user)
        const users = await productManager.getAll();
        // console.log(users)
    res.render('realtimeproducts', {
        user: users
    })
    } catch (error) {
        console.error(error.message)
    }
})


// const manager = new ProductManager('../products.json');
// const router = express.Router()
// router.use(urlencoded({ extended: true }));




// router.get('/realTimeProducts', async (req,res)=>{
//     const users = await manager.getProducts();
//     res.render('realtimeproducts', {
//         user: users,
//         style: 'index.css',
//     })
// })

// router.post('/realTimeProducts', async (req, res) => {
//     const { title, description, price, thumbmail, code, stock, category, status } = req.body;

//     try {
//         const result = await manager.addProduct({
//             title,
//             description,
//             price,
//             thumbmail,
//             code,
//             stock,
//             category,
//             status
//         });
//         res.render('realtimeproducts', {
//             user: users,
//             style: 'index.css',
//         })
//         socketServer.emit('result', result)
        
//     } catch (error) {
//         console.error('Error al agregar el producto:', error);
//         res.status(500).send({message:'Error al agregar el producto' });
//     }
// });

// router.post('/user', (req, res) => {
//     const { name, email, password } = req.body;

//     const newUser = {
//         name: req.body.name,
//         email: req.body.email,
//         pasword: req.body.password
//     }

//     users.push(newUser)
//     console.log('nuevo usuario registrado:', newUser)
//     res.send('Usuario Registrado Correctamente')
// })



// router.get('/', async(req, res) => {
//     const users = await manager.getProducts();
//     res.render('home', {
//         user: users,
//         style: 'index.css',
//     });
// })

// router.get('/register', async (req, res) => {
//     res.render('register');
// });

export default router