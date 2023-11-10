import CartDBManager from "../dao/dbManagers/cartManager.js";
import ProductDBManager from "../dao/dbManagers/productManager.js";

const cartsManager = new CartDBManager();
const productManager = new ProductDBManager()

const createCartService = async (products)=>{
    cartsManager.save({
    products
})};

const getOneCartService = async (id) => await cartsManager.getOne(id)
const getAllCartsService = async ()=> await cartsManager.getAll()

const addProductToCartService = async (cid, pid) =>{
    const cart= await cartsManager.getOne(cid)
    const product = await productManager.getOne(pid)
    const existingProductIndex = cart.products.findIndex(
        (p) => p._id.toString() === product._id.toString()
      );
        if (existingProductIndex === -1) {
            cart.products.push(product)
        } else {
            cart.products[existingProductIndex].quantity = (cart.products[existingProductIndex].quantity || 1) + (product.quantity || 1);
        }
        
        await cartsManager.update(cid, cart );
        return `Product added to cart ${cid}`;
}

export{
    addProductToCartService,
    createCartService,
    getOneCartService,
    getAllCartsService
}