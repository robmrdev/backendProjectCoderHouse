import { getAllProductsService } from "../services/viewsService.js";


const getAllProducts = async (req,res)=>{
    const { page = 1, limit = 5, query = '', sort = '' } = req.query;
    const user = req.session.user
    try {
        const productData = await getAllProductsService(page,limit,query,sort, user)
    res.render('realtimeproducts', productData)
    } catch (error) {
        console.error(error.message)
    }
}
const getChat = async (req,res)=>{
    try {
        let messages = await getChatService()
        res.render('chat',{
            messages: messages
        })
    } catch (error) {
        console.error(error.message)
    }
}
const getRegister = async (req,res)=>{
    try {
        res.render('register');
    } catch (error) {
        console.error(error.message)
    }
}
const getLogin = async (req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        console.error(error.message)
    }
}
const mainPage = async (req,res)=>{
    try {
        res.redirect('realtimeproducts')
    } catch (error) {
        console.error(error.message)
    }
}

export {
    getAllProducts,
    getChat,
    getRegister,
    getLogin,
    mainPage
}