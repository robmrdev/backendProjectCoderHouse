
import { authToken, generateToken } from "../utils.js";

const createUser = (users, name, email, password) => {
    const exist = users.find(user => user.email === email);
    if (exist) return res.status(400).send({ status: 'error', message: 'User already registered' })

    const user = {
        name,
        email,
        password
    }

    users.push(user)
    const accessToken = generateToken(user)
    return accessToken
}

const loginUser = (users, email, password) => {
    const user = users.find(user => user.email === email && user.password === password)

    if (!user) return res.status(401).send({ status: 'error', message: 'Invalid credentials' })

    delete user.password;
    const accessToken = generateToken(user)
    return accessToken
}
export {
    createUser,
    loginUser
}