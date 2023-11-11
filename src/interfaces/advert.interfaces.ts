import { z } from "zod";
import {
  advertSchema,
  advertSchemaRequest,
  advertSchemaRequestUpdate,
  advertSchemaResponse,
  allAdvertSchema,
} from "../schemas/advert.schema";

export type TAdvert = z.infer<typeof advertSchema>;

export type TAdvertAll = z.infer<typeof allAdvertSchema>;

export type TAdvertRequest = z.infer<typeof advertSchemaRequest>;

export type TAdvertResponse = z.infer<typeof advertSchemaResponse>;

export type TAdvertRequestUpdate = z.infer<typeof advertSchemaRequestUpdate>;
