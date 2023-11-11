import { Request, Response } from "express";
import { listAdvertService } from "../../services/adverts/listAdverts.service";
import { IPagination } from "../../interfaces/pagina.interface";

export const listAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<IPagination>> => {

  const serverUrl = `${req.protocol}://${req.get('host')}`;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const itemsPerPage = req.query.pageSize ? parseInt(req.query.pageSize as string) : 12;

  const adverts: IPagination = await listAdvertService(page,itemsPerPage,serverUrl);

  return res.json(adverts);
};
