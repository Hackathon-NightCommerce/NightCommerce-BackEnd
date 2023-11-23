import { Request, Response } from "express";
import { TAdvertRequestUpdate } from "../../interfaces/advert.interfaces";
import { createFiltersAdvertService } from "./../../services/adverts/createFiltesAdvert.service";

export const createFiltersAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const { price, ...rest } = req.query;

  const where: TAdvertRequestUpdate = {
    ...rest,
    ...(price && { price: Number(price) }),
  };

  const filtes = await createFiltersAdvertService(where);
  return res.json(filtes);
};
