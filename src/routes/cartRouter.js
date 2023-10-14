import { Router } from "express";
import CartDBManager from "../dao/dbManagers/cartManager.js";
import ProductDBManager from "../dao/dbManagers/productManager.js";

const router = Router();
const cartManager = new CartDBManager();
const productManager = new ProductDBManager()


router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getAll();
        res.send({ status: 'succes', payload: carts });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await cartManager.getOne(id);
        res.send({ status: 'succes', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
})

router.post('/', async (req, res) => {
    const { products = [] } = req.body;

    // if(typeof products !== 'array'){
    //     return res.status(400).send({status: 'error', error: 'products needs to be an Array'})
    // }
    try {
        const result = await cartManager.save({
            products
        });
        res.status(201).send({ status: 'succes', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
})


router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params


    try {
        const product = { product: { _id: pid }};
        
        const result = await cartManager.addProduct(cid, product);

        const productsById = await productManager.getOne(pid)
        if (productsById === "Not Found") {
            res.status(404).send({ error: 'Id Not Found' });
        }



            res.status(200).send({ message: result });
        
    } catch (error) {
        console.error('Error al agregar un producto al carrito:', error);
        res.status(500).send({ error: 'Error al agregar un producto al carrito' });
    }
});

export default router;