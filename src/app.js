import express from 'express';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import PermissionsRoutes from './routes/permissions.routes.js';
<<<<<<< Updated upstream
import usersroles from './routes/usersroles.routes.js';
=======
import rolesRoutes from './routes/roles.routes.js'; 
import rolesPermissionsRoutes from './routes/rolesPermissions.routes.js'; 



>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
app.use("/api", usersroles);
=======
app.use("/api", rolesRoutes);
app.use("/api", rolesPermissionsRoutes);


>>>>>>> Stashed changes

export default app;