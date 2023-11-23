import { z } from "zod";
import { userSchema } from "./user.schema";
import { CategoryProduct } from "../entities/adverts.entities";

export const advertSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  price: z.number().positive(),
  description: z.string(),
  cover_image: z.string(),
  information_additional: z.string().nullable(),
  category: z.nativeEnum(CategoryProduct),
  published: z.boolean(),
  qtd: z.number(),
  promotion: z.boolean(),
  user: userSchema.omit({
    address: true,
    cpf: true,
    password: true,
    email: true,
    phone: true,
    description: true,
  }),
  // images: z.array(
  //   z.object({
  //     id: z.number(),
  //     image: z.string(),
  //   })
  // ),
  comments: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
      created_at: z.date(),
    })
  ),
});

export const advertSchemaRequest = advertSchema.omit({
  id: true,
  user: true,
  comments: true,
  itemsCart: true,
});
// .extend({ images: z.string().array().optional() });

export const advertSchemaRequestUpdate = advertSchemaRequest.partial();

export const advertSchemaRequestFilters = advertSchemaRequest
  .omit({ description: true, cover_image: true, information_additional: true })
  .partial();

export const advertSchemaResponse = advertSchema.partial({
  images: true,
  comments: true,
  itemsCart: true,
});

export const advertSchemaGallery = advertSchema.omit({
  images: true,
  user: true,
  itemsCart: true,
});

export const allAdvertSchema = advertSchemaResponse.array();
