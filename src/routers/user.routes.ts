import express from "express";
import UserController from "../controllers/UserController";
import { verifyToken } from "../middleware/middleware";
// Initialisation des import
const router = express.Router();
const user = new UserController();

// Post

router.post("/user-auth/register", user.register);
router.post("/user-auth/login", user.login);
router.post("/user-auth/logout", verifyToken, user.logout);

// PUT
router.put("/user-auth/edit", user.updateUser);

export { router as userRoute };
