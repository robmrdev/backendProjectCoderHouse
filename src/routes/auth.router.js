import { Router } from "express";
import { authToken, generateToken } from "../utils.js";
import passport from "passport";

const router = Router()

const users = [] //?REEMPLAZAR CON BASE DE DATOS LUEGO

router.post('/register', async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        const exist = users.find(user => user.email === email);
        if (exist) return res.status(400).send({status: 'error', message:'User already registered'})

        const user = {
            name,
            email,
            password
        }

        users.push(user)

        const accessToken = generateToken(user)
        res.send({status: 'sucess', access_token:accessToken})
    } catch (error) {
        res.status(500).send({status: 'error', message:'Register fail'})
    }
})


router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = users.find(user=> user.email === email && user.password === password)

        if(!user) return res.status(401).send({status: 'error', message:'Invalid credentials'})

        delete user.password;
        const accessToken = generateToken(user)
        res.cookie('accessTokenCookie', accessToken, {maxAge:60 * 60 * 1000}).send({status: 'success'})
        // res.send({status: 'sucess', access_token:accessToken})

    } catch (error) {
        res.status(500).send({status: 'error', message:'Login fail'})
    }
})

router.get('/private', passport.authenticate('current',{session:false}), (req,res)=>{
    res.send({status: 'success', payload: req.user})
})

export default router