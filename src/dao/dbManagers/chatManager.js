import { chatModel } from "../models/chatModel.js";




export default class ChatDBManager {
    constructor() {
        console.log('working products with DB')
    }

    getAll = async () => {
        const messages = await chatModel.find()
        return messages.map(msj => msj.toObject())
    }

    save = async (message) => {
        const result = await chatModel.create(message);
        return result;
    }

}