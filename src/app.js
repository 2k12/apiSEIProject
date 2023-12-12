import express from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import PermissionsRoutes from './routes/permissions.routes.js';
import usersroles from './routes/usersroles.routes.js';
import Orders from './routes/orders.routes.js';

const app = express();


// server configuration 
app.set("port", process.env.PORT || 4000);
app.set("url", `Server running in http://localhost:${app.get("port")}`);



// middlewares
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());



// routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", PermissionsRoutes);
app.use("/api", usersroles);
app.use("/api", Orders)

export default app;