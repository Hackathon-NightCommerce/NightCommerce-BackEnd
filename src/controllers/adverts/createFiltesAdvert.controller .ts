// import { Request, Response } from "express";
// import { TAdvertRequestUpdate } from "../../interfaces/advert.interfaces";
// import { createFiltersAdvertService } from './../../services/adverts/createFiltesAdvert.service';

// export const createFiltersAdvertController = async (
//   req: Request,
//   res: Response
// ): Promise<Response<string>> => {

//   const { year, price, mileage, ...rest } = req.query;
  
//   const where: TAdvertRequestUpdate = {
//     ...rest,
//     ...(year && { year: Number(year) }),
//     ...(price && { price: Number(price) }),
//     ...(mileage && { mileage: Number(mileage) }),
//   };

//   const filtes = await createFiltersAdvertService(where);
//   return res.json(filtes);
// };