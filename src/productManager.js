import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.path = "../products.json"
        this.products = []
    }

    static id = 0
addProduct = async ({ title, description, price, thumbmail=[], code, stock, category, status=true }) => {
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
        let newProduct = { title, description, price, thumbmail, code, stock, category, status, id: ProductManager.id };
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
    updateProduct = async ({ id, title, description, price, thumbmail, code, stock, category, status }) => {
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
                        thumbmail,
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



// PASO 1, AGREGAR PRODUCTOS

// await product.addProduct('Producto 1','Descripcion de producto 1',1500,'https://www.productos.com/producto1.png','a1a1a1a1a1',30)
// await product.addProduct('Producto 2','Descripcion de producto 2',3000,'https://www.productos.com/producto2.png','b2b2b2b2b2',30)
// await product.addProduct('Producto 3','Descripcion de producto 3',4000,'https://www.productos.com/producto3.png','c3c3c3c3c3',30)




//PASO 2, Obtener los productos

// let products = await product.getProducts()
// console.log(products)




// PASO 3, Borrar productos

// let products = await product.getProducts()
// await product.deleteProduct(2)
// console.log(products)





//PASO 4, ACTUALIZAR DATOS DE UN PRODUCTO

// await product.updateProduct({
//     title: 'Producto 1 MOFIDICADO2',
//     price: 343434,
//     thumbmail: 'https://www.productos.com/producto1.png',
//     code: 'a1a1a1a1a1',
//     stock: 30,
//     id: 1
// })

// let products = await product.getProducts()
// console.log(products)


    // updateProduct = async ({ title, description, price, thumbmail=[], code, stock, category, status=true }) => {
    //     try {
    //         if (!title || !description || !price || !code || !stock || !category || !status) {
    //             return('Todos los campos son requeridos para actualizar un producto.')
    //         }
            
    //         await this.deleteProduct(id);
    //         let productsBefore = await this.getProducts()
    //         let modifiedProduct = [{ title, description, price, thumbmail, code, stock, category, status }, ...productsBefore];
    //         await fs.writeFile(this.path, JSON.stringify(modifiedProduct))
    //     }
    //     catch (err) {
    //         return(`updateProduct fails`)
    //     }
    // }