import { Request, Response } from "express";
import { createImgAdvertService } from "../../services/images/createImgAdvert.service";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";

export const createImgAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<TImageGalleryResponse>> => {
  const { image } = req.body;
  const advertId = Number(req.params.id);

  const newImg = await createImgAdvertService(image, advertId);

  return res.json(newImg);
};
