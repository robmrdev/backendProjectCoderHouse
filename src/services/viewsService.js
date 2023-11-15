import { productModel } from "../dao/models/productModel.js";
import ProductDBManager from "../dao/dbManagers/productManager.js";
import ChatDBManager from "../dao/dbManagers/chatManager.js";

const chatManager = new ChatDBManager()
const productManager = new ProductDBManager();


const getAllProductsService = async (page,limit,query,sort,user) =>{
    let sortOption = {};
    if (sort === 'asc' || sort === 'desc') {
        sortOption = { price: sort === 'asc' ? 1 : -1 };
    } else {
        sortOption = {}; 
    }
    
        const queryObj = query ? { category: query } : {};

        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate(queryObj, {limit, page, lean: true, sort: sortOption});
        
        function getCategories(products) {
            const categories = [];
            products.map((p) => {
                if (!categories.includes(p.category)) {
                categories.push(p.category);
                }
            });
            return categories;
            }

        const products = await productManager.getAll();
        const allCategories = getCategories(products);


        const productData = docs.map(prod => {
            const firstImg = Object.values(prod.thumbnail)[0][0];
            return {
                _id: prod._id,
                title: prod.title,
                description: prod.description,
                code: prod.code,
                price: prod.price,
                stock: prod.stock,
                category: prod.category,
                colorCode: prod.colorCode,
                colors: prod.color,
                color: firstImg,
            };
        });
        const productFinalData = {
            product: productData,
            user: user,
            page: page,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            nextPage: nextPage,
            prevPage: prevPage,
            limit: limit,
            query,
            sort,
            allCategories,
        }
        return productFinalData
}
const getChatService = async () =>{
    let messages = await chatManager.getAll()
    return messages
}

export {
    getAllProductsService
}