import { Router } from "express";
import { GetProducts,GetProduct,CreateProduct,UpdateProduct,DeleteProduct } from "../controllers/Product.controller.js";


const router = Router();

router.get("/products", GetProducts);
router.get("/product/:idProduct", GetProduct);
router.post("/product", CreateProduct);
router.put("/product/:idProduct", UpdateProduct);
router.delete("/product/:idProduct", DeleteProduct);

export default router;
