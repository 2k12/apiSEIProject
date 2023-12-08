import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        required_error: "Ingrese Nombre"
    }),
    email : z.string({
        required_error: "Ingrese Email"
        
    })
    .email({
        message: "Ingrese un correo electronico valido"
    }),
    password: z.string({
        required_error: "Ingrese Contraseña"
    })
    .min(8,{
        message: "La contraseña debe ser de mínimo 8 caracteres"
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Ingrese un Email",
    }).email({
        message: "Ingrese un correo electronico valido"
    }),
    password: z.string({
        required_error: "Ingrese Contraseña"
    })
    .min(8,{
        message: "La contraseña debe ser de mínimo 8 caracteres"
    })
});