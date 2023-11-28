import { Request, Response } from "express";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";
import { searchAdvertsService } from "../../services/adverts/searchAdvert.service";
import { AppError } from "../../errors";

export const searchAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse>> => {
  const serverUrl = `${req.protocol}://${req.get("host")}`;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const itemsPerPage = req.query.pageSize
    ? parseInt(req.query.pageSize as string)
    : 12;

  const searchTerm: string | undefined = req.query.product?.toString();

  if (!searchTerm) {
    throw new AppError("Não há o que procurar", 400);
  }

  const newAdvert = await searchAdvertsService(
    searchTerm,
    serverUrl,
    page,
    itemsPerPage
  );

  return res.json(newAdvert);
};
