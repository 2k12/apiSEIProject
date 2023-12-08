import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


export const GetUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        if (!users) return res.status(404).json({ error: "No se cargaron los datos de usuarios" });
        res.status(200).json({ data: users });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const GetUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const user = await User.getUser(idUser);
        if (!user) return res.status(404).json({ error: "No se encontró al usuario" });
        res.status(200).json({ data: user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const UpdateUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { name, email, password, is_2fa_enabled, secret_2fa } = req.body;
        const updatedUser = await User.updateUser(idUser, name, email, password, is_2fa_enabled, secret_2fa);
        if (!updatedUser) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const DeleteUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const deletedUser = await User.deleteUser(idUser);
        if (!deletedUser) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json({ data: deletedUser });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};


// ! principal

export const CreateUser = async (req, res) => {
    try {
        const { name, email, password, is_2fa_enabled, secret_2fa } = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const newUser = await User.createUser(name, email, passwordHash, is_2fa_enabled, secret_2fa);
        const token = await createAccessToken({ id: newUser.id, name : newUser.name ,email: newUser.email });

        res.cookie("token",token);
        res.status(200).json({message: "Usuario Creado Satisfactoriamente"});

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.getUserbyEmail(email);
        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
        
        const isMatch = await bcrypt.compare(password,userFound.password);

        if(!isMatch) return res.status(400).json({message:"Contraseña Incorrecta"});

        const token = await createAccessToken({ id: userFound.id, name: userFound.name ,email: userFound.email });

        res.cookie("token",token);
        res.status(200).json({message: "Usuario Logueado"});

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

export const Logout = (req, res) => {
    res.cookie("token","",{
        expires : new Date (0)
    })
    return res.sendStatus(200);
};

export const Profile  = async (req,res) => {
    const userFound = await User.getUser(req.user.id);
    if(!userFound) return res.status(400).json({message :"Usuario no encontrado"});
    res.json(userFound);
}

