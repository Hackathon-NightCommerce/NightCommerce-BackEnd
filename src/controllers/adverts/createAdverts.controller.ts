import { Request, Response } from "express";
import {
  TAdvertRequest,
  TAdvertResponse,
} from "../../interfaces/advert.interfaces";
import { createAdvertService } from "../../services/adverts/createAdvert.service";

export const createAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse>> => {
  const advertData: TAdvertRequest = req.body;
  const userId = Number(res.locals.userId);

  const newAdvert: TAdvertResponse = await createAdvertService(
    advertData,
    userId
  );

  return res.json(newAdvert);
};
