import { Router } from "express";
import { GetPermissions, GetPermission, CreatePermission, UpdatePermission, DeletePermission } from "../controllers/permissions.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Rutas para Permissions
router.get("/permissions", authRequired, GetPermissions);
router.get("/permission/:idPermission", authRequired, GetPermission);
router.post("/permission", authRequired, CreatePermission);
router.put("/permission/:idPermission", authRequired, UpdatePermission);
router.delete("/permission/:idPermission", authRequired, DeletePermission);

export default router;
