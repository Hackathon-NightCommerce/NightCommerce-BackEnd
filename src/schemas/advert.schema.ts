import { z } from "zod";
import { FuelType } from "../entities/adverts.entities";
import {
  imageGallerySchemaAdvert,
} from "./imageGallery.schema";
import { userSchema } from "./user.schema";
import {
  commentSchemaResponse,
} from "../schemas/comment.schema";

export const advertSchema = z.object({
  id: z.number(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int().positive(),
  fuel: z.enum([FuelType.FLEX, FuelType.HIBRIDO, FuelType.ELETRICO]),
  mileage: z.number().int(),
  color: z.string(),
  table_fipe: z.boolean(),
  price: z.number().positive(),
  description: z.string(),
  cover_image: z.string(),
  published: z.boolean(),
  user: userSchema.omit({ address: true, password: true }),
  images: imageGallerySchemaAdvert.array(),
  comments: commentSchemaResponse.array(),
});

export const advertSchemaRequest = advertSchema
  .omit({
    id: true,
    user: true,
    comments: true,
  })
  .extend({ images: z.string().array().optional() });

export const advertSchemaRequestUpdate = advertSchemaRequest.partial();

export const advertSchemaRequestfilters = advertSchemaRequest
  .omit({ description: true, cover_image: true })
  .partial();

export const advertSchemaResponse = advertSchema.partial({
  images: true,
  comments: true,
});

export const advertSchemaGallery = advertSchema.omit({
  images: true,
  user: true,
});

export const allAdvertSchema = advertSchemaResponse.array();
