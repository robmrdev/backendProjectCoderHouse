import ProductDBManager from "../dao/dbManagers/productManager.js";

const productManager = new ProductDBManager();

const getAllProductsService = async () => productManager.getAll();

const newProductService = async (title, description, price, thumbnail, code, stock, category, status, color, colorCode) => {

    if (!title || !description || !price || !code || !stock || !category || !color || !colorCode || typeof status !== 'boolean') {
        return status(400).send({ status: 'error', error: 'Incomplete values' })
    }
    const products = await productManager.getAll()

    const existingProduct = products.find(product => product.code === code);
    if (existingProduct) {
        return status(400).send({ status: 'error', error: `El producto con código ${code} ya existe.` });
    }

    const result = await productManager.save({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
        color,
        colorCode
    });
    return status(201).send({ status: 'succes', payload: result });

}
const getOneProductService = async (id) => {
    const result = await productManager.getOne(id);
    return result
}
const deleteProductService = async (id) => {
    const result = await productManager.delete(id);
    return result
}
const updateProductService = async (id, title, description, price, thumbnail, code, stock, category, status, color, colorCode) =>{
    
    if (!title || !description || !price || !code || !stock || !category || !color || !colorCode || typeof status !== 'boolean') {
        return status(400).send({ status: 'error', error: 'Incomplete values' })
    }
    const result = await productManager.update(id, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
        color,
        colorCode
    })
    return result
}
export {
    getAllProductsService,
    newProductService,
    getOneProductService,
    deleteProductService,
    updateProductService
}