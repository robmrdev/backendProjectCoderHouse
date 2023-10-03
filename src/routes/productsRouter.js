import { Router } from "express";
import ProductDBManager from '../dao/dbManagers/productManager.js'

const router = Router();
const productManager = new ProductDBManager();


router.get('/', async(req,res)=>{
    try{
        const products = await productManager.getAll();
        res.send({ status: 'succes', payload: products});
    } catch (error){
        res.status(500).send({status: 'error', error: error.message});
    }
})


router.post('/', async(req,res)=>{  
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;

    if(!title || !description || !price || !code || !stock || !category || typeof status !== 'boolean'){
        return res.status(400).send({status: 'error', error: 'Incomplete values'})
    }
    const products = await productManager.getAll()

    const existingProduct = products.find(product => product.code === code);
    if (existingProduct) {
        return res.status(400).send({ status: 'error', error: `El producto con código ${code} ya existe.` });
    }

    try {
        const result = await productManager.save({
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock, 
            category, 
            status
        });
        res.status(201).send({ status: 'succes', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', error: error.message});
    }
})

router.get ('/:id', async(req,res)=>{
    const {id}= req.params
    const result = await productManager.getOne(id);
    res.send({ status: 'succes', payload: result})
})
router.delete('/:id', async(req,res)=>{
    const {id}= req.params
    const result = await productManager.delete(id);
    res.send({ status: 'succes', payload: result})
})
router.put('/:id', async(req,res)=>{
    const {title, description, price, thumbnail, code, stock, category, status} = req.body;
    const {id}= req.params

    if(!title || !description || !price || !code || !stock || !category || typeof status !== 'boolean'){
        return res.status(400).send({status: 'error', error: 'Incomplete values'})
    }

    try {
        const result = await productManager.update(id, {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock, 
            category, 
            status
        })
        res.send({ status: 'succes', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', error: error.message});
    }
})

export default router;