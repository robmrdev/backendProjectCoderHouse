import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY_JWT } from './config/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRIVATE_KEY = PRIVATE_KEY_JWT

const generateToken = (user) => {
    console.log('123')
    const token = jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: '24h' })
    return token
}


const authToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) return res.status(401).send({ status: 'error', message: 'Not Authenticate' })

    const token = authToken.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY_JWT, (error, credentials) => {
        if (error) return res.status(403).send({ status: 'error', message: 'Not Authorized' })
        req.user = credentials.user;
        next();
    })
}


const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (plainPassword, hashedPassword)=>
    bcrypt.compareSync(plainPassword, hashedPassword);

export {
    authToken,
    generateToken,
    createHash,
    isValidPassword,
    __dirname
}
