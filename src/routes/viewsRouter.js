import { Router } from "express";
import ChatDBManager from "../dao/dbManagers/chatManager.js";
import passport from "passport";
import { getAllProducts, getChat, getLogin, getRegister, mainPage } from "../controllers/viewsController.js";
const router = Router()
const chatManager = new ChatDBManager()

const publicAccess = (req,res,next)=>{
    if(req.session.user) return res.redirect('/')
        next()
}
const privateAccess = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login')
    next()
}


router.get('/realTimeProducts', passport.authenticate('current',{session:false}), getAllProducts)

router.get('/chat', getChat)

router.get('/register',publicAccess, getRegister)

router.get('/login',publicAccess, getLogin)

router.get('/',privateAccess, mainPage)




// router.get('/products', async (req, res) => {
//     const { page = 1, limit = 3, query = '', sort = '' } = req.query;
  
//     let sortOption = {};
//     if (sort === 'asc' || sort === 'desc') {
//       sortOption = { price: sort === 'asc' ? 1 : -1 };
//     } else {
//       sortOption = {}; 
//     }
  
//     try {

//       const queryObj = query ? { category: query } : {};
  
//       const {docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate(queryObj, {limit, page, lean: true, sort: sortOption});
  
//       function getCategories(products) {
//         const categories = [];
//         products.map((p) => {
//           if (!categories.includes(p.category)) {
//             categories.push(p.category);
//           }
//         });
//         return categories;
//       }
  
//       const allProducts = await productManager.getAll();
//       const allCategories = getCategories(allProducts);
//       {docs, hasPrevPage, hasNextPage, nextPage, prevPage }
//       res.render('products', {
//         user: docs,
//         page: page,
//         hasPrevPage: hasPrevPage,
//         hasNextPage: hasNextPage,
//         nextPage: nextPage,
//         prevPage: prevPage,
//         limit: limit,
//         query,
//         sort,
//         allCategories,
//       });
//     } catch (error) {
//         console.error(error.message)
//     }
//   });

export default router













// router.get('/products', async (req, res) => {
//     const {page=1, limit=3, query='', sort=''}= req.query;

//     let sortOption = {};
//     if (sort === 'asc' || sort === 'desc') {
//         sortOption = { price: sort === 'asc' ? 1 : -1 }; 
//       }
//     const {docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate({}, {limit, page, lean: true, sort: sortOption})

//     const users = docs;
    
// function getCategories (products){
//     const categories = []
//     products.map( p =>{
//         if (!categories.includes(p.category)){
//             categories.push(p.category)
//         }
        
//     })
//     return categories
// }
// const allProducts = await productManager.getAll()
// const allCategories = getCategories(allProducts)



//     res.render('products',{
//         user: users,
//         page,
//         hasPrevPage, 
//         hasNextPage, 
//         nextPage, 
//         prevPage,
//         limit,
//         query,
//         sort,
//         allCategories
//     })
// })













// const manager = new ProductManager('../products.json');
// const router = express.Router()
// router.use(urlencoded({ extended: true }));




// router.get('/realTimeProducts', async (req,res)=>{
//     const users = await manager.getProducts();
//     res.render('realtimeproducts', {
//         user: users,
//         style: 'index.css',
//     })
// })

// router.post('/realTimeProducts', async (req, res) => {
//     const { title, description, price, thumbnail, code, stock, category, status } = req.body;

//     try {
//         const result = await manager.addProduct({
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock,
//             category,
//             status
//         });
//         res.render('realtimeproducts', {
//             user: users,
//             style: 'index.css',
//         })
//         socketServer.emit('result', result)
        
//     } catch (error) {
//         console.error('Error al agregar el producto:', error);
//         res.status(500).send({message:'Error al agregar el producto' });
//     }
// });

// router.post('/user', (req, res) => {
//     const { name, email, password } = req.body;

//     const newUser = {
//         name: req.body.name,
//         email: req.body.email,
//         pasword: req.body.password
//     }

//     users.push(newUser)
//     console.log('nuevo usuario registrado:', newUser)
//     res.send('Usuario Registrado Correctamente')
// })



// router.get('/', async(req, res) => {
//     const users = await manager.getProducts();
//     res.render('home', {
//         user: users,
//         style: 'index.css',
//     });
// })

// router.get('/register', async (req, res) => {
//     res.render('register');
// });
