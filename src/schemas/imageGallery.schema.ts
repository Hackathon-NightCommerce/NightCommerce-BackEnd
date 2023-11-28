import { z } from "zod";
import { CategoryProduct } from "../entities/adverts.entities";
// import { FuelType } from "../entities/adverts.entities";

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  adverts: z.object({
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
  }),
});

export const imageGallerySchemaRequest = imageGallerySchema.omit({
  id: true,
  adverts: true,
});

export const imageGallerySchemaResponse = imageGallerySchema;

export const imageGallerySchemaAdvert = imageGallerySchema.omit({
  adverts: true,
});
