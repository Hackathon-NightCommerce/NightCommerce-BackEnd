import { z } from "zod";

export const cartSchemaRequest = z.object({
    products: z.array(z.object({
        advert_id:z.number(),
        name:z.string(),
        qtd: z.number().positive(),
        price: z.number().positive(),
    }))
})

export const paymentSchemaRequest = cartSchemaRequest.merge(
    z.object({
        methodPayment:z.string()
    })
)