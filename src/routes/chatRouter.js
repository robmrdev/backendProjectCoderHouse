import { Router } from "express";
import { getMessages, postMessage } from "../controllers/chatController.js";

const router = Router();

router.post('/', postMessage)

router.get('/', getMessages)

export default router