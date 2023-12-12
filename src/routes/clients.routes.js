import { Router } from "express";
import { GetClient, CreateClient, UpdateClient, DeleteClient, GetAllClients } from "../controllers/Clients.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/clients", authRequired, GetAllClients);
//router.get("/clients", GetAllClients);
router.get("/client/:idClient", authRequired, GetClient);
router.post("/client", authRequired, CreateClient);
router.put("/client/:idClient", authRequired, UpdateClient);
router.delete("/client/:idClient", authRequired, DeleteClient);

export default router;
