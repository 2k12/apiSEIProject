import { z } from "zod";

const priceRegex = /^\d+\.\d{2}$/;

export const registerProductSchema = z.object({
    name: z.string({
        required_error: "Ingrese Nombre."
    }),
    price: z.string({
        required_error: "Ingrese Precio."
    }).refine((precio) => priceRegex.test(precio), {
        message: "Formato de precio inválido. Debe ser un número con dos decimales. "
    }),
    quantity: z.number({
        required_error: "Ingrese Cantidad."
    }).min(1, {
        message: "La cantidad debe ser al menos 1."
    })
});
