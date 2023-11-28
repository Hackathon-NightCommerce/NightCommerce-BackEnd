import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Adverts, CategoryProduct } from "../../entities/adverts.entities";
import { allAdvertSchema } from "../../schemas/advert.schema";
import { IPagination } from "./../../interfaces/pagina.interface";

export const listfiltersAdvertsService = async (
  pageReq: number,
  perPageReq: number,
  serverUrl: string,
  where: any
): Promise<IPagination> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const prevPage: string | null =
    pageReq - 1 < 1
      ? null
      : `${serverUrl}/adverts/?page=${pageReq - 1}&perPage=${perPageReq}`;

  const nextPage: string | null = `${serverUrl}/adverts/?page=${
    pageReq + 1
  }&perPage=${perPageReq}`;

  const { nameAdvert, brandAdvert, categoryAdvert, promotionAdvert, minPrice, maxPrice } = where;

  const [allAdvertsFilters, totalCount] = await advertRepository
    .createQueryBuilder("adverts")
    .take(perPageReq)
    .skip(perPageReq * (pageReq - 1))
    .leftJoinAndSelect("adverts.user", "Users")
    .where("1=1")
    .andWhere(nameAdvert ? "adverts.name = :name" : "1=1", { name: nameAdvert })
    .andWhere(brandAdvert ? "adverts.brand = :brand" : "1=1", { brand: brandAdvert })
    .andWhere(promotionAdvert ? "adverts.promotion = :promotion" : "1=1", {
      promotion: promotionAdvert,
    })
    .andWhere(categoryAdvert ? "adverts.category = :category" : "1=1", {
      category: categoryAdvert as CategoryProduct,
    })
    .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", {
      minPrice: minPrice,
    })
    .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", {
      maxPrice: maxPrice,
    })
    .getManyAndCount();

  const totalPages = Math.ceil(totalCount / perPageReq);

  const nextAdverts = await advertRepository.find({
    where: {
      name: where.nameAdvert,
      brand: where.brandAdvert,
      category: where.categoryAdvert,
      promotion: where.promotionAdvert,
    },
    take: perPageReq,
    skip: perPageReq * pageReq,
  });

  const parsedAdverts = allAdvertSchema.parse(allAdvertsFilters);

  const pagination = {
    prevPage,
    nextPage: nextAdverts.length > 0 ? nextPage : null,
    totalPages,
    data: parsedAdverts,
  };

  return pagination;
};
