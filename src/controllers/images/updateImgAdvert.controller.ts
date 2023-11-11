import { Request, Response } from "express";
import { TImageGalleryRequest, TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";
import { updateImgAdvertService } from "../../services/images/updateImgAdvert.service";

export const updateImgAdvertController = async (req: Request, res: Response): Promise<Response<TImageGalleryResponse>> => {
  const {image}: TImageGalleryRequest = req.body;

  const updatedImg: TImageGalleryResponse = await updateImgAdvertService(
    Number(req.params.id),
    image
  );

  return res.json(updatedImg);
};
