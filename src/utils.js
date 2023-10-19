import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRIVATE_KEY = 'coder47300'

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

// const authToken = (req, res, next) => {
//     const authToken = req.headers.authorization;

//     if (!authToken) return res.status(401).send({ status: 'error', message: 'Not authenticate' })

//     const token = authToken.split(' ')[1]
//     jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
//         if (error) return res.status(403).send({ status: 'error', message: 'Not authorized' })
//         req.user = credentials.user;
//         next()
//     })

// }


const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (plainPassword, hashedPassword)=>
    bcrypt.compareSync(plainPassword, hashedPassword);

export {
    // authToken,
    // generateToken,
    createHash,
    isValidPassword,
    __dirname
}
