import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { Repository } from "typeorm";

export const createFiltersAdvertService = async (where: any): Promise<any> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const distinctColumns = ["name", "brand", "category", "promotion"];
  const priceColumn = "price";

  const { name, brand, category, promotion, minPrice, maxPrice } = where;

  const distinctPromises = distinctColumns.map((column) =>
    advertRepository
      .createQueryBuilder("adverts")
      .select(`DISTINCT(Adverts.${column}) as ${column}`)
      .where(name ? "adverts.name = :name" : "1=1", { name })
      .andWhere(brand ? "adverts.brand = :brand" : "1=1", { brand })
      .andWhere(category ? "adverts.category = :category" : "1=1", { category })
      .andWhere(promotion !== undefined ? "adverts.promotion = :promotion" : "1=1", { promotion })
      .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice })
      .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice })
      .getRawMany()
  );

  const [nameAdvert, brandAdvert, categoryAdvert, promotionAdvert] = await Promise.all(distinctPromises);

  const priceRange = await advertRepository
    .createQueryBuilder("adverts")
    .select(`MIN(Adverts.${priceColumn}) as minPrice, MAX(Adverts.${priceColumn}) as maxPrice`)
    .andWhere(name ? "adverts.name = :name" : "1=1", { name })
    .andWhere(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(category ? "adverts.category = :category" : "1=1", { category })
    .andWhere(promotion !== undefined ? "adverts.promotion = :promotion" : "1=1", { promotion })
    .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice })
    .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice })
    .getRawOne();

  return {
    nameAdvert: nameAdvert.map((item) => item.name),
    brandAdvert: brandAdvert.map((item) => item.brand),
    categoryAdvert: categoryAdvert.map((item) => item.category),
    promotionAdvert: promotionAdvert.map((item) => item.promotion),
    minPrice: priceRange.minprice,
    maxPrice: priceRange.maxprice,
  };
};
