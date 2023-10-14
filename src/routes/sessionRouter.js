import { Router } from "express";
import userModel from "../dao/models/userModel.js";


const router = Router();

router.post('/register', async (req,res)=>{
    try {
        const {first_name, last_name, age, email, password} = req.body
        const exist = await userModel.findOne({email});
        if (exist){
            return res.status(400).send({status: 'error', message: 'User already exists'})
        }
        await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password
        })
        res.status(201).send({status: 'success', message: 'User Register'})
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
})

router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email,password});
        
        if (!user){
            return res.status(400).send({status: 'error', message: 'Incorrect Credentials'})
        }
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: user.rol? user.rol : 'USER'
        }

        res.send({status: 'success', message: 'Login success'})

    } catch (error) {
        res.status(500).send({status: 'error', message: error.message})
    }
})

router.get('/logout', (req,res)=>{
    req.session.destroy(error=>{
        if (error) return res.status(500).send({status:'error', error:'logout fail'})
        res.redirect('/')
    })
})




router.post('/cookie', (req,res)=>{
    const data = req.body;
    res.cookie('coderCookie', data, {maxAge:10000}).send({status:'success', message: 'Cookie Ok'})
})


export default router