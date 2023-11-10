import { addProductToCartService, createCartService, getAllCartsService, getOneCartService } from "../services/cartService.js";

const createCart = async (req, res) => {
    const { products = [] } = req.body;
    try {
        const result = await createCartService(products)
        res.status(201).send({ status: 'succes', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}
const getOneCart = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getOneCartService(id);
        res.send({ status: 'succes', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}
const getAllCarts = async (req, res) => {
    try {
        const carts = getAllCartsService();
        res.send({ status: 'succes', payload: carts });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const result = await addProductToCartService(cid, pid);
        res.send({status:'success', message: result})
    } catch (error) {
        console.error('Error al agregar un producto al carrito:', error);
        res.status(500).send({ error: 'Error al agregar un producto al carrito' });
    }
}

export {
    addProductToCart,
    createCart,
    getOneCart,
    getAllCarts
}