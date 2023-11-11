import { z } from "zod";
import {
  imageGallerySchema,
  imageGallerySchemaRequest,
} from "../schemas/imageGallery.schema";

export type TImageGalleryResponse = z.infer<typeof imageGallerySchema>;

export type TImageGalleryRequest = z.infer<typeof imageGallerySchemaRequest>;
