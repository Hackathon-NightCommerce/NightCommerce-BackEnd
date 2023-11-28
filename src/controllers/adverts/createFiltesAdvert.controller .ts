import { Request, Response } from "express";
import { TAdvertRequestUpdate } from "../../interfaces/advert.interfaces";
import { createFiltersAdvertService } from "./../../services/adverts/createFiltesAdvert.service";
import { CategoryProduct } from "../../entities/adverts.entities";

export const createFiltersAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const { brandAdvert, categoryAdvert, nameAdvert, price } =
    req.query;

  const where: TAdvertRequestUpdate = {
    name: nameAdvert?.toString(),
    brand: brandAdvert?.toString(),
    category: categoryAdvert as CategoryProduct,
    ...(price && { price: Number(price) }),
  };
  const filtes = await createFiltersAdvertService(where);
  return res.json(filtes);
};
