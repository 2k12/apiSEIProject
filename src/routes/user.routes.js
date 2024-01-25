import { Router } from "express";
import { GetUsers,GetUser,CreateUser,UpdateUser,DeleteUser,Login, Logout ,Profile, CompareTwoToken, sendEmailC} from "../controllers/User.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema,registerSchema } from "../schemas/auth.schema.js";
const router = Router();

router.get("/users", GetUsers);
router.get("/user/:idUser", GetUser);
router.put("/user/:idUser", authRequired , UpdateUser);
router.delete("/user/:idUser", authRequired ,DeleteUser);

// !importants
router.post("/register", validateSchema(registerSchema),CreateUser);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verify-code", CompareTwoToken);
router.post("/send-email", sendEmailC);
router.get("/profile", authRequired , Profile);




export default router;
