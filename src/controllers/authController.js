import { createUser, loginUser } from "../services/authService.js";

const users = [{email:"thais@sd.com", password: "1234"}] //?REEMPLAZAR CON BASE DE DATOS LUEGO

const register = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        const accessToken = createUser(users, name, email, password)
        res.send({status: 'sucess', access_token:accessToken})
    } catch (error) {
        res.status(500).send({status: 'error', message:'Register fail'})
    }
}

const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const accessToken = loginUser(users, email, password)
        res.cookie('accessTokenCookie', accessToken, {maxAge:60 * 60 * 1000}).send({status: 'success'})
    } catch (error) {
        res.status(500).send({status: 'error', message:'Login fail'})
    }
}

export {
    register,
    login
}