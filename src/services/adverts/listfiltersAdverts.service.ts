// import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";
// import { AppDataSource } from "../../data-source";
// import { Adverts, FuelType } from "../../entities/adverts.entities";
// import { allAdvertSchema } from "../../schemas/advert.schema";
// import { IPagination } from "./../../interfaces/pagina.interface";

// export const listfiltersAdvertsService = async (pageReq: number, perPageReq: number, serverUrl: string, where: any): Promise<IPagination> => {
//   const advertRepository = AppDataSource.getRepository(Adverts);

//   const prevPage: string | null = pageReq - 1 < 1 ? null : `${serverUrl}/adverts/?page=${pageReq - 1}&perPage=${perPageReq}`;

//   const nextPage: string | null = `${serverUrl}/adverts/?page=${pageReq + 1}&perPage=${perPageReq}`;

//   const { brand, color, fuel, model, minYear, maxYear, minPrice, maxPrice, minMileage, maxMileage } = where;

//   const [allAdvertsFilters, totalCount] = await advertRepository
//     .createQueryBuilder("adverts")
//     .take(perPageReq)
//     .skip(perPageReq * (pageReq - 1))
//     .leftJoinAndSelect('adverts.user', 'Users')
//     .where("1=1")
//     .andWhere(brand ? "adverts.brand = :brand" : "1=1", { brand: brand })
//     .andWhere(color ? "adverts.color = :color" : "1=1", { color: color })
//     .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
//     .andWhere(model ? "adverts.model = :model" : "1=1", { model: model })
//     .andWhere(minYear !== undefined ? "adverts.year >= :minYear" : "1=1", { minYear: minYear })
//     .andWhere(maxYear !== undefined ? "adverts.year <= :maxYear" : "1=1", { maxYear: maxYear })
//     .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice: minPrice })
//     .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice: maxPrice })
//     .andWhere(minMileage !== undefined ? "adverts.mileage >= :minMileage" : "1=1", { minMileage: minMileage })
//     .andWhere(maxMileage !== undefined ? "adverts.mileage <= :maxMileage" : "1=1", { maxMileage: maxMileage })
//     .getManyAndCount();


//   const totalPages = Math.ceil(totalCount / perPageReq);

//   const nextAdverts = await advertRepository.find({
//     where:{
//       brand: where.brand,
//       color: where.color,   
//       fuel: where.fuel,     
//       model: where.model,   
//       year: where.year,     
//   },
//     take: perPageReq,
//     skip: perPageReq * pageReq,
//   });

//   const parsedAdverts = allAdvertSchema.parse(allAdvertsFilters);

//   const pagination = {
//     prevPage,
//     nextPage: nextAdverts.length > 0 ? nextPage : null,
//     totalPages,
//     data: parsedAdverts,
//   };

//   return pagination;
// };
