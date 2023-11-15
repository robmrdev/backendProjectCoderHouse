import { getMessagesService, postMessageService } from "../services/chatService.js";


const postMessage = async (req, res)=>{
    const {message} =req.body
    const {user} = req.body
    try {
        const result = postMessageService({user,message});
        res.status(201).send({ status: 'succes', payload: result });
    } catch (error) {
        res.status(500).send({status: 'error', error: error.message});
    }
}

const getMessages = async(req,res)=>{
    try{
        const messages = await getMessagesService()
        res.send({ status: 'succes', payload: messages});
    } catch (error){
        res.status(500).send({status: 'error', error: error.message});
    }
}

export {
    postMessage,
    getMessages
}