import { Router } from "express";
import { UpdateRolePermission, getRolePermission, setRolePermission, deleteRolePermission } from "../controllers/RolesPemissions.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router(); 

router.get("/rolePermission/:idRole", authRequired, getRolePermission);
router.put("/rolePermissionUp/:idRole", authRequired, UpdateRolePermission);
router.post("/rolePermission/:idRole", authRequired, setRolePermission);
router.delete("/rolePermission/:idRole", authRequired, deleteRolePermission);


export default router;
