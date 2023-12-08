import { Router } from "express";
import { GetProducts, GetProduct, CreateProduct, UpdateProduct, DeleteProduct } from "../controllers/Product.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get("/products", authRequired, GetProducts);
router.get("/product/:idProduct", authRequired, GetProduct);
router.post("/product", authRequired, CreateProduct);
router.put("/product/:idProduct", authRequired, UpdateProduct);
router.delete("/product/:idProduct", authRequired, DeleteProduct);

export default router;
