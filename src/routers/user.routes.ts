import express from "express";
import UserController from "../controllers/UserController";

// Initialisation des import
const router = express.Router();
const user = new UserController();

// End point Post

// Post

router.post("/create-user/", user.createUser);
router.put("/update-user/", user.updateUser);
export { router as userRoute };
