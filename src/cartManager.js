import { promises as fs } from "fs"

export default class CartManager {
    constructor() {
        this.path = "./carts.json"
        this.carts = []
    }
    static id = 0


    getCarts = async () => {
        try {
            let carts = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        }
        catch (err) {
            return 'Error Getting Carts'
        }
    }
    getCartById = async (cid) => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cid);
            return cart || "Not Found";
        } catch (err) {
            return 'getCartById fails';
        }
    }
    addCart = async ({ products = [] }) => {
        try {
            const carts = await this.getCarts();
            const highestId = carts.reduce((maxId, cart) => Math.max(maxId, cart.id), 0);
            const newId = highestId + 1;
            const newCart = { products, id: newId };
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts));
            return 'New cart Added';
        } catch (err) {
            return 'Error Adding Carts';
        }
    }
    addProductToCart = async (cid, product) => {
        try {
            const cart = await this.getCartById(cid);
            if (cart === "Not Found") {
                return `Cart with ID ${cid} not found`;
            }

            const existingProductIndex = cart.products.findIndex(p => p.product.id === product.product.id);

            if (existingProductIndex === -1) {
                cart.products.push(product);
            } else {
                cart.products[existingProductIndex].quantity += product.quantity;
            }

            await this.updateCart(cart);
            return `Product added to cart ${cid}`;
        } catch (err) {
            return 'addProductToCart fails';
        }
    }

    updateCart = async (updatedCart)=> {
        try {
            const carts = await this.getCarts();
            const index = carts.findIndex(cart => cart.id === updatedCart.id);
            if (index !== -1) {
                carts[index] = updatedCart;
                await fs.writeFile(this.path, JSON.stringify(carts));
            }
        } catch (err) {
            console.error('Error updating cart:', err);
        }
    }

}

const cart = new CartManager