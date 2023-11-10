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
        const cart = await cartModel.findOne({_id:id})
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
    






}