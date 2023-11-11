import { Request, Response } from "express";
import { deleteAdvertService } from "../../services/adverts/deleteAdvert.service";

export const deleteAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  await deleteAdvertService(Number(req.params.id));

  return res.status(204).send();
};
