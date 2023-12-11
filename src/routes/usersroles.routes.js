import { Router } from "express";
import {
    getAllUserRoles,
    getUserRoles,
    assignRoleToUser,
    updateUserRole,
    removeUserRole,
    removeRole
} from '../controllers/usersroles.controllers.js';
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();
router.get("/usersroles", authRequired, getAllUserRoles);
router.get("/usersroles/:userId", authRequired, getUserRoles);
router.post("/usersroles", authRequired, assignRoleToUser); // es el insert
router.put("/usersroles", authRequired, updateUserRole);
router.delete("/usersroles", authRequired, removeUserRole);
router.put("/usersroles/role", authRequired, removeRole);


export default router;