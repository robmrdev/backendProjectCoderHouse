import { Router } from "express";
import passport from "passport";
import { login, register } from "../controllers/authController.js";

const router = Router()


router.post('/register', register)

router.post('/login', login)

router.get('/private', passport.authenticate('current',{session:false}), (req,res)=>{
    res.send({status: 'success', payload: req.user})
})

export default router
