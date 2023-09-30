import { productModel } from "../models/productModel.js";

export default class ProductDBManager {
    constructor (){
        console.log('working products with DB')
    }

    getAll = async () => {
        const products = await productModel.find()
        return products.map(product => product.toObject())
    }
    getOne = async(id)=>{
        const product = await productModel.findById(id)
        return product
    }
    save = async (product) =>{
        const result = await productModel.create(product);
        return result;
    }

    update = async (id, cart)=>{
        const result = await productModel.updateOne({ _id:id}, cart);
        return result
    }
    delete = async (id) => {
            const result = await productModel.deleteOne({_id: id});
            return result

            // let respDelete = await this.getProducts();
            // let filterDelete = respDelete.filter(products => products.id != id)
            // if(filterDelete.length == respDelete.length){
            //     return ('Product Not Found')
            // }
            // await fs.writeFile(this.path, JSON.stringify(filterDelete))
            // return ('Product Deleted')
        
    }
}