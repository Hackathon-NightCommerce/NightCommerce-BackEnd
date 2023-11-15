// import { Request, Response } from "express";
// import { listfiltersAdvertsService } from "../../services/adverts/listfiltersAdverts.service";
// import { TAdvertRequestUpdate} from "../../interfaces/advert.interfaces";
// import { IPagination } from './../../interfaces/pagina.interface';

// export const filteredAdvertsController = async (
//   req: Request,
//   res: Response
// ): Promise<Response<IPagination>> => {

//   const serverUrl = `${req.protocol}://${req.get('host')}`;
//   const page = parseInt(req.query.page as string) || 1;
//   const itemsPerPage = parseInt(req.query.pageSize as string) || 12;

//   const where: TAdvertRequestUpdate = req.query

//   const adverts: IPagination = await listfiltersAdvertsService(
//     page,
//     itemsPerPage,
//     serverUrl,
//     where
//   );

//   return res.json(adverts);
// };
