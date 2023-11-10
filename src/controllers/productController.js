import { deleteProductService, getAllProductsService, getOneProductService, newProductService, updateProductService } from "../services/productService.js";


const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService()
        res.send({ status: 'succes', payload: products });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}


const newProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category, status, color, colorCode } = req.body;
    try {
        const result = newProductService(title, description, price, thumbnail, code, stock, category, status, color, colorCode)
        res.status(201).send({ status: 'succes', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}

const getOneProduct = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getOneProductService(id)
        res.send({ status: 'succes', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const result = await deleteProductService(id)
        res.send({ status: 'succes', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category, status, color, colorCode } = req.body;
    const { id } = req.params
    try {
        const result = await updateProductService( id, title, description, price, thumbnail, code, stock, category, status, color, colorCode)
        res.send({ status: 'succes', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
}
export {
    getAllProducts,
    newProduct,
    getOneProduct,
    deleteProduct,
    updateProduct
}