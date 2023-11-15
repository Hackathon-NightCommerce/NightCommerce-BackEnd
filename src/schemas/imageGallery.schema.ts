import { z } from "zod";
// import { FuelType } from "../entities/adverts.entities";

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  adverts: z.object({
    id: z.number(),
    brand: z.string(),
    model: z.string(),
    year: z.number().int().positive(),
    fuel: z.string(),
    mileage: z.number().int(),
    color: z.string(),
    table_fipe: z.boolean(),
    price: z.number().positive(),
    description: z.string(),
    cover_image: z.string(),
    published: z.boolean(),
  })
});

export const imageGallerySchemaRequest = imageGallerySchema.omit({ id: true, adverts: true });

export const imageGallerySchemaResponse = imageGallerySchema

export const imageGallerySchemaAdvert = imageGallerySchema.omit({ adverts: true })