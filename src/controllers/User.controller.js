



import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { secretjwt, secretcodeg } from "../config.js";
import jwt from "jsonwebtoken";
import sendEmail from "../libs/emailSender.js";




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
// getDataofUserbyEmail
export const Getstrong = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.getDataofUserbyEmail(email);
        if (!user) return res.status(404).json({ error: "No se cargaron los datos " });
        res.status(200).json({ data: user });
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

export const UpdateTwoToken = async (idUser, secret_2fa) => {
    try {
        const updatedUser = await User.updateToken(idUser, secret_2fa);
        if (!updatedUser) {
            throw new Error("Token2fa no Actualizado");
        }
        return true;
    } catch (error) {
        console.log("Error desconocido no se pudo actualizar el SecretToken2fa")
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
        const { name, email, password } = req.body;
        const userFound = await User.getUserbyEmail(email);
        if (userFound) return res.status(400).json({ error: 'Email ya Registrado.' });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.createUser(name, email, passwordHash);
        const token = await createAccessToken({ id: newUser.id, name: newUser.name, email: newUser.email });

        // res.cookie("token", token);
        res.sendStatus(200);

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
};

// export const Login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const userFound = await User.getDataofUserbyEmail(email);

//         if (!userFound) return res.status(400).json({ error: "Usuario no encontrado" });

//         // console.log(userFound[0].user_password);

//         const isMatch = await bcrypt.compare(password, userFound[0].user_password);

//         if (!isMatch) return res.status(400).json({ error: "Contraseña Incorrecta" });

//         const token = await createAccessToken({ id: userFound[0].user_id, name: userFound[0].user_name, email: userFound[0].user_email, rol: userFound[0].role_name, twofa: userFound[0].is_2fa_enabled, permissions: userFound[0].permissions });
//         await sendVerificationEmail();
//         res.cookie("token", token);
//         res.status(200).json(["Usuario Logueado"]);

//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(500).send(error);
//         }
//     }
// };

export const CompareTwoToken = async (req, res) => {

    // const  { email }  = req.user;
    const { code } = req.body;


    try {

        const compareToken = await User.CompareTwoToken(code);
        if (!compareToken) return res.status(400).json({ error: "Token Incorrecto!" });

        const userFound = await User.getDataofUserbyEmail(compareToken.email);
        if (!userFound) return res.status(400).json({ error: "Usuario no encontrado" });

        const token = await createAccessToken({
            id: userFound[0].user_id,
            name: userFound[0].user_name,
            email: userFound[0].user_email,
            is_2fa_enabled: userFound[0].is_2fa_enabled,
            rol: userFound[0].role_name,
            permissions: userFound[0].permissions
        });

        // // res.cookie("token", token);
        res.status(200).json({
            success: true, data: {
                id: userFound[0].user_id,
                name: userFound[0].user_name,
                email: userFound[0].user_email,
                is_2fa_enabled: userFound[0].is_2fa_enabled,
                rol: userFound[0].role_name,
                permissions: userFound[0].permissions
            }
        });
        // res.status(200).json(compareInputSecret);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error);
        }
    }
}

export const sendEmailC = async (req, res) => {
    const { email } = req.body;
    // const  email  = "prueba@gmail.com";
    const userFound = await User.getDataofUserbyEmail(email);
    if (!userFound) return res.status(400).json({ error: "Usuario no encontrado" });
    const verificationToken = generateRandomNumber();
    const emailOptions = {
        to: userFound[0].user_email,
        // to: 'jeipige@gmail.com',
        subject: 'Verificación de Email para 2FA 🛡️',

        text: `Hola, ${userFound[0].user_name}. Tu código de verificación es: ${verificationToken}`,
        html: `
            <div style="background-color: #f2f3f5; color: #333; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                <h1 style="color: #4a76a8;">Hola, ${userFound[0].user_name}! 👋</h1>
                <p>Estás a un paso de acceder a la Aplicación Web SEI_App. Por favor, usa el siguiente código para completar tu proceso de verificación de dos pasos.</p>
                <div style="background-color: white; color: #4a76a8; font-weight: bold; padding: 15px; margin: 20px auto; width: fit-content; border-radius: 5px; border: 1px solid #ddd; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <span style="font-size: 18px;">${verificationToken}</span>
                </div>
                <p>Si no has solicitado este código, por favor ignora este mensaje y comunícate con soporte.</p>
                <p style="font-size: 14px; color: #666;">Equipo de SEI_App 🌟</p>
            </div>
        `,
    };

    try {
        await sendEmail(emailOptions);
        await UpdateTwoToken(userFound[0].user_id, verificationToken);
        res.status(200).json({ message: 'Por favor, verifica tu token de 2FA.' });
    } catch (error) {
        console.error("Error al enviar correo electrónico:", error);
        res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
    }
    return;
}
export const sendEmailCD = async (req, res) => {
    const { email } = req.body;
    // const  email  = "prueba@gmail.com";
    const userFound = await User.getDataofUserbyEmail(email);
    if (!userFound) return res.status(400).json({ error: "Usuario no encontrado" });
    const verificationToken = generateRandomNumber();
    const emailOptions = {
        to: userFound[0].user_email,
        // to: 'jeipige@gmail.com',
        subject: 'Inicio de Sesión!',

        text: `Hola, ${userFound[0].user_name}.`,
        html: `
            <div style="background-color: #f2f3f5; color: #333; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                <h1 style="color: #4a76a8;">Hola, ${userFound[0].user_name}! 👋</h1>
                <p>Se ha iniciado Sesión en tu cuenta de SEI_App .</p>
                
                <p>Si no has sido tu quien ha iniciado Sesión, por favor  comunícate con soporte.</p>
                <p style="font-size: 14px; color: #666;">Equipo de SEI_App 🌟</p>
            </div>
        `,
    };

    try {
        await sendEmail(emailOptions);
        await UpdateTwoToken(userFound[0].user_id, verificationToken);
        res.status(200).json({ message: 'Por favor, verifica tu token de 2FA.' });
    } catch (error) {
        console.error("Error al enviar correo electrónico:", error);
        res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
    }
    return;
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.getDataofUserbyEmail(email);
        if (!userFound) return res.status(400).json({ error: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound[0].user_password);
        if (!isMatch) return res.status(400).json({ error: "Contraseña Incorrecta" });


        // if (userFound[0].is_2fa_enabled) {
        //     await sendEmailC();
        // }

        const token = await createAccessToken({
            id: userFound[0].user_id,
            name: userFound[0].user_name,
            email: userFound[0].user_email,
            is_2fa_enabled: userFound[0].is_2fa_enabled,
            rol: userFound[0].role_name,
            permissions: userFound[0].permissions
        });

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        // });

        res.json(
            {
                id: userFound[0].user_id,
                name: userFound[0].user_name,
                email: userFound[0].user_email,
                is_2fa_enabled: userFound[0].is_2fa_enabled,
                rol: userFound[0].role_name,
                permissions: userFound[0].permissions
            }
        );

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
};

// export const verifyCompleteLogin = async ( req,res) =>{
//     const user = await
// }

export const Logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const Profile = async (req, res) => {
    const userFound = await User.getUser(req.user.id);
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
    res.json(userFound);
}

export const VerifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401);

    jwt.verify(token, secretjwt.secret, async (err, user) => {
        if (err) return res.status(401);

        const userFound = await User.getDataofUserbyEmail(user.email);
        if (!userFound) return res.status(401).json({ message: "No Autorizado!" });
        return res.json({
            id: userFound[0].user_id,
            name: userFound[0].user_name,
            email: userFound[0].user_email,
            rol: userFound[0].role_name,
            twofa: userFound[0].is_2fa_enabled,
            permissions: userFound[0].permissions
        });
    });
}

function generateRandomNumber() {
    const randomFactor = secretcodeg || 1;
    const randomNumber = Math.floor(Math.random() * 9e7) + 1e7;
    const modifiedNumber = randomNumber * randomFactor;
    const eightDigitNumber = modifiedNumber % 1e8;
    return eightDigitNumber;
}



