import { Router } from "express";
import { GetUsers,GetUser,CreateUser,UpdateUser,DeleteUser,Login, Logout ,Profile} from "../controllers/User.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/users", GetUsers);
router.get("/user/:idUser", GetUser);
router.put("/user/:idUser", authRequired , UpdateUser);
router.delete("/user/:idUser", authRequired ,DeleteUser);

// !importants
router.post("/create", CreateUser);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/profile", authRequired , Profile);


export default router;
