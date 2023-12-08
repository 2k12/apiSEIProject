import jwt from 'jsonwebtoken';
import { secretjwt } from "../config.js";



export const authRequired = (req, res, next) => {
    // const cookies = req.cookies;
    // console.log(cookies);
    const { token } = req.cookies;
    if(!token) return res.status(401).json({message: "No existe token, Acceso No Autorizado!"});

    jwt.verify(token, secretjwt.secret,(err,user) =>{

        if(err) return res.status(403).json({message:"Token Invalido"});

        req.user = user
        // console.log(user);
        next();

    });


}