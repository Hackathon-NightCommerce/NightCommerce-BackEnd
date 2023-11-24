import { Request, Response } from "express";
import { listOneAdvertService } from "../../services/adverts/listOneAdvert.service";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";

export const listOneAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse>> => {
  
  const advertUser: TAdvertResponse = await listOneAdvertService(
    Number(req.params.id)
  );
  return res.json(advertUser);
};
