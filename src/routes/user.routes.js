import { Router } from "express";
import { GetUsers,GetUser,CreateUser,UpdateUser,DeleteUser,Login, Logout } from "../controllers/User.controller.js";


const router = Router();

router.get("/users", GetUsers);
router.get("/user/:idUser", GetUser);
router.put("/user/:idUser", UpdateUser);
router.delete("/user/:idUser", DeleteUser);

// !importants
router.post("/create", CreateUser);
router.post("/login", Login);
router.post("/logout", Logout);


export default router;
