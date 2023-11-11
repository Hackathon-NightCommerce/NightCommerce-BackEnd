import { Request, Response } from "express";
import { deleteImgAdvertService } from "../../services/images/deleteImgAdvert.service";

export const deleteImgAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  await deleteImgAdvertService(Number(req.params.id));

  return res.status(204).send();
};
