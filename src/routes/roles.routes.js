import { Router } from "express";
import { GetAllRoles, GetRole, CreateRole, UpdateRole, DeleteRole } from "../controllers/Roles.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();


router.get("/roles", GetAllRoles);
router.get("/roles/:idRole", authRequired, GetRole);
router.post("/roles", authRequired, CreateRole);
router.put("/roles/:idRole", authRequired, UpdateRole);
router.delete("/roles/:idRole", authRequired, DeleteRole);

export default router;