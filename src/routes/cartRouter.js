import { Router } from "express";
import { addProductToCart, createCart, getAllCarts, getOneCart } from "../controllers/cartController.js";

const router = Router();


router.get('/', getAllCarts)

router.get('/:id', getOneCart)

router.post('/', createCart)

router.put('/:cid/products/:pid', addProductToCart);

export default router;