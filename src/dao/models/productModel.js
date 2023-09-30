import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    }, 
    description:{
        type: String,
        require: true
    }, 
    price:{
        type: Number,
        require: true
    }, 
    thumbmail:{
        type: Array,
        default: []
    }, 
    code:{
        type: String,
        require: true
    }, 
    stock:{
        type: Number,
        require: true
    }, 
    category:{
        type: String,
        require: true
    }, 
    status:{
        type: Boolean,
        default: true
    }
});

export const productModel = mongoose.model(productCollection, productSchema);