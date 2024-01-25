import { Router } from "express";
import {  GetAuditData } from "../controllers/Audit.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get("/audit", authRequired, GetAuditData);

export default router;

