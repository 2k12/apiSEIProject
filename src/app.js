import express from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import PermissionsRoutes from './routes/permissions.routes.js';
import usersrolesRoutes from './routes/usersroles.routes.js';
import OrdersRoutes from './routes/orders.routes.js';
import rolesRoutes from './routes/roles.routes.js'; 
import rolesPermissionsRoutes from './routes/rolesPermissions.routes.js'; 



import auditRoutes from "./routes/audit.routes.js";


const app = express();


// server configuration 
app.set("port", process.env.PORT || 4000);
app.set("url", `Server running in http://localhost:${app.get("port")}`);



// middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());



// routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", PermissionsRoutes);
app.use("/api", usersrolesRoutes);
app.use("/api", OrdersRoutes)
app.use("/api", rolesRoutes);
app.use("/api", rolesPermissionsRoutes);

app.use("/api", auditRoutes);

export default app;