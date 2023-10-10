import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./products.json"
        this.products = []
    }

    static id = 0


addProduct = async ({ title, description, price, thumbnail=[], code, stock, category, status=true }) => {
    try {
        this.products = await this.getProducts();
        if (!title || !description || !price || !code || !stock || !category || typeof status !== 'boolean') {
            return('Todos los campos son requeridos para agregar un producto.');
        }
        const existingProduct = await this.products.find(product => product.code === code);
        if (existingProduct) {
            return(`El producto con código ${code} ya existe.`);
        }
        if (this.products.length === 0) {
            ProductManager.id = 0;
        } else {
            const lastProduct = this.products[this.products.length - 1];
            ProductManager.id = lastProduct.id;
        }
        ProductManager.id++;
        let newProduct = { title, description, price, thumbnail, code, stock, category, status, id: ProductManager.id };
        this.products.push(newProduct);
        
        await fs.writeFile(this.path, JSON.stringify(this.products));
        return('Producto agregado exitosamente.');
    } catch (err) {
        console.log(`addProduct fails`, err);
        return true;
    }
}


    getProducts = async () => {
        try {
            let products = await fs.readFile(this.path, "utf-8")
            return JSON.parse(products)
        }
        catch (err) {
            let products = await fs.readFile(this.path, "utf-8")
            console.log(JSON.parse(products)) 
            return "ERROR GET PRODUCTS"
        }
    }

    getProductsById = async (id) => {
        try {
            let respId = await this.getProducts();
            if (!respId.find(product => product.id === id)) {
                return("Not Found")
            } else {
                return(respId.find(product => product.id === id))
            }
        }
        catch (err) {
            console.log(`getProductsById fails`)
            return false
        }
    }
    updateProduct = async ({ id, title, description, price, thumbnail, code, stock, category, status }) => {
        try {
            if (!id || !title || !description || !price || !code || !stock || !category || typeof status !== 'boolean') {
                return('Todos los campos son requeridos para actualizar un producto.');
            }
    
            let productsBefore = await this.getProducts();
            const updatedProducts = productsBefore.map(product => {
                if (product.id === id) {
                    return {
                        id,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                        category,
                        status
                    };
                } else {
                    return product;
                }
            });
    
            await fs.writeFile(this.path, JSON.stringify(updatedProducts));
            return 'Producto actualizado exitosamente22';
        } catch (err) {
            return 'Error al actualizar el producto';
        }
    }

    deleteProduct = async (id) => {
        try {
            let respDelete = await this.getProducts();
            let filterDelete = respDelete.filter(products => products.id != id)
            if(filterDelete.length == respDelete.length){
                return ('Product Not Found')
            }
            await fs.writeFile(this.path, JSON.stringify(filterDelete))
            return ('Product Deleted')
        }
        catch (err) {
            return(`deleteProduct fails`)
        }
    }
}



const product = new ProductManager;

