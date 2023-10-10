import express from "express"
import { urlencoded } from "express";
import ProductManager from "../dao/fileManagers/productManager.js";
// import { socketServer } from "../app.js";


import { Router } from "express";
import CartDBManager from "../dao/dbManagers/cartManager.js";
import ProductDBManager from "../dao/dbManagers/productManager.js";
import ChatDBManager from "../dao/dbManagers/chatManager.js";
import { productModel } from "../dao/models/productModel.js";

const router = Router()

const productManager = new ProductDBManager();
const chatManager = new ChatDBManager()

router.get('/realTimeProducts', async (req, res) => {
    try {
        const users = await productManager.getAll();
        res.render('realtimeproducts', {
            user: users
        })
    } catch (error) {
        console.error(error.message)
    }
})

router.get('/chat', async (req, res) => {
    try {
        let messages = await chatManager.getAll()
        res.render('chat', {
            messages: messages
        })

    } catch (error) {
        console.error(error.message)
    }
})

router.get('/products', async (req, res) => {
    const { page = 1, limit = 3, query = '', sort = '' } = req.query;

    let sortOption = {};
    if (sort === 'asc' || sort === 'desc') {
        sortOption = { price: sort === 'asc' ? 1 : -1 };
    } else {
        sortOption = {};
    }

    try {

        const queryObj = query ? { category: query } : {};

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate(queryObj, { limit, page, lean: true, sort: sortOption });

        function getCategories(products) {
            const categories = [];
            products.map((p) => {
                if (!categories.includes(p.category)) {
                    categories.push(p.category);
                }
            });
            return categories;
        }

        const allProducts = await productManager.getAll();
        const allCategories = getCategories(allProducts);
        { docs, hasPrevPage, hasNextPage, nextPage, prevPage }
        res.render('products', {
            user: docs,
            page: page,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            nextPage: nextPage,
            prevPage: prevPage,
            limit: limit,
            query,
            sort,
            allCategories,
        });
    } catch (error) {
        console.error(error.message)
    }
});

export default router