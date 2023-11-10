import { Router } from "express";
import { deleteProduct, getAllProducts, getOneProduct, newProduct, updateProduct } from "../controllers/productController.js";

const router = Router();

router.get('/', getAllProducts)

router.post('/', newProduct)

router.get ('/:id', getOneProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

export default router;