import { z } from "zod";
export const registerSchema = z.object({
    name: z.string({
        required_error: "Ingrese Nombre."
    }),
    email: z.string({
        required_error: "Ingrese Email."
    })
        .email({
            message: "Ingrese un correo electrónico válido."
        }),
    password: z.string({
        required_error: "Ingrese Contraseña."
    })
        .min(8, {
            message: "La contraseña debe ser de mínimo 8 caracteres."
        })
        .regex(/[A-Z]/, {
            message: "La contraseña debe contener al menos una letra mayúscula."
        })
        .regex(/[\d\W]/, {
            message: "La contraseña debe contener al menos un número o símbolo."
        })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Ingrese un Email",
    }).email({
        message: "Ingrese un correo electronico válido. "
    }),
    password: z.string({
        required_error: "Ingrese Contraseña. "
    })
        .min(1, {
            message: "La contraseña debe ser de mínimo 8 caracteres"
        })
});