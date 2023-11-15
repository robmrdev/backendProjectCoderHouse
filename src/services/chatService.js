
import ChatDBManager from "../dao/dbManagers/chatManager.js";
const chatManager = new ChatDBManager();

const postMessageService = async () => {
    const result = await chatManager.save({
        user,
        message
    });
    return result
}

const getMessagesService = async ()=> await chatManager.getAll();

export {
    postMessageService,
    getMessagesService
}