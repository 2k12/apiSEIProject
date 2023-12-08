import express from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();


// server configuration 
app.set("port",process.env.PORT || 3000);
app.set("url",`Server running in http://localhost:${app.get("port")}`);



// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());



// routes
app.use("/api",productRoutes);
app.use("/api",userRoutes);


export default app;