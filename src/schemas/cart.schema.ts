import { z } from "zod";

export const cartSchemaRequest = z.object({
    products: z.array(z.object({
        advert_id:z.number(),
        qtd: z.number().positive(),
        price: z.number().positive(),
    }))
})