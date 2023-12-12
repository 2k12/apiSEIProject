import { Router } from "express";
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/Orders.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/orders", authRequired, getAllOrders);
router.get("/order/:orderId", authRequired, getOrderById);
router.post("/order", authRequired, createOrder);
router.put("/order/:orderId", authRequired, updateOrder);
router.delete("/order/:orderId", authRequired, deleteOrder);

export default router;
