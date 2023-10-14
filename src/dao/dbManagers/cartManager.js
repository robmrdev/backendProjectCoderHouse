import { cartModel } from "../models/cartModel.js"

export default class CartDBManager {
    constructor (){
        console.log('working carts with DB')
    }

    getAll = async () => {
        const carts = await cartModel.find().lean();
        return carts
    }
    
    getOne = async(id)=>{
        const cart = await cartModel.findById(id)
        return cart
    }

    save = async (cart) =>{
        const result = await cartModel.create(cart);
        return result;
    }
    update = async (id, cart)=>{
        const result = await cartModel.updateOne({ _id:id}, cart);
        return result
    }
    addProduct = async (cid,product)=>{
        const cart= await this.getOne(cid)
// return console.log(cart.products)

        // const existingProductIndex = cart.products.find(p => p.product._id === product.product._id);

            // if (existingProductIndex === -1) {
                cart.products.push(product)
            // } else {
            //     cart.products[existingProductIndex].quantity += product.quantity;
            // }
            
            // console.log(product.product._id)
            // cart.products.push(product);
            await this.update(cid, cart );
            return `Product added to cart ${cid}`;
    }






}