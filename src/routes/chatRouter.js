import { Router } from "express";
import ChatDBManager from "../dao/dbManagers/chatManager.js";

const router = Router();
const chatManager = new ChatDBManager();

router.post('/', async (req, res)=>{
    const {message} =req.body
    const {user} = req.body
    try {
        const result = await chatManager.save({
            user,
            message
        });
        res.status(201).send({ status: 'succes', payload: result });
    } catch (error) {
        
    }
})

router.get('/', async(req,res)=>{
    try{
        const messages = await chatManager.getAll();
        res.send({ status: 'succes', payload: messages});
    } catch (error){
        res.status(500).send({status: 'error', error: error.message});
    }
})

export default router