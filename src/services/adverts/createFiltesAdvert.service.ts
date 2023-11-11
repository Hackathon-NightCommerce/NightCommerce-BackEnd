import { AppDataSource } from "../../data-source";
import { Adverts, FuelType } from "../../entities/adverts.entities";
import { Repository } from 'typeorm';

export const createFiltersAdvertService = async (where: any): Promise<any> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const distinctColumns = ["brand", "model", "fuel", "color"];
  const yearColumn = "year";
  const priceColumn = "price";
  const mileageColumn = "mileage";

  const { brand, color, fuel, model, minYear, maxYear, minPrice, maxPrice, minMileage, maxMileage } = where;

  const distinctPromises = distinctColumns.map(column =>
    advertRepository.createQueryBuilder("adverts")
      .select(`DISTINCT(Adverts.${column})`, column)
      .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
      .andWhere(color ? "adverts.color = :color" : "1=1", { color })
      .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
      .andWhere(model ? "adverts.model = :model" : "1=1", { model })
      .andWhere(minYear !== undefined ? "adverts.year >= :minYear" : "1=1", { minYear })
      .andWhere(maxYear !== undefined ? "adverts.year <= :maxYear" : "1=1", { maxYear })
      .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice })
      .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice })
      .andWhere(minMileage !== undefined ? "adverts.mileage >= :minMileage" : "1=1", { minMileage })
      .andWhere(maxMileage !== undefined ? "adverts.mileage <= :maxMileage" : "1=1", { maxMileage })
      .getRawMany()

  );

  const yearRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${yearColumn}) as minYear, MAX(Adverts.${yearColumn}) as maxYear`)
    .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(color ? "adverts.color = :color" : "1=1", { color })
    .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
    .andWhere(model ? "adverts.model = :model" : "1=1", { model })
    .andWhere(minYear !== undefined ? "adverts.year >= :minYear" : "1=1", { minYear })
    .andWhere(maxYear !== undefined ? "adverts.year <= :maxYear" : "1=1", { maxYear })
    .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice })
    .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice })
    .andWhere(minMileage !== undefined ? "adverts.mileage >= :minMileage" : "1=1", { minMileage })
    .andWhere(maxMileage !== undefined ? "adverts.mileage <= :maxMileage" : "1=1", { maxMileage })
    .getRawOne();

  const priceRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${priceColumn}) as minPrice, MAX(Adverts.${priceColumn}) as maxPrice`)
    .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(color ? "adverts.color = :color" : "1=1", { color })
    .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
    .andWhere(model ? "adverts.model = :model" : "1=1", { model })
    .andWhere(minYear !== undefined ? "adverts.year >= :minYear" : "1=1", { minYear })
    .andWhere(maxYear !== undefined ? "adverts.year <= :maxYear" : "1=1", { maxYear })
    .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice })
    .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice })
    .andWhere(minMileage !== undefined ? "adverts.mileage >= :minMileage" : "1=1", { minMileage })
    .andWhere(maxMileage !== undefined ? "adverts.mileage <= :maxMileage" : "1=1", { maxMileage })
    .getRawOne();

  const mileageRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${mileageColumn}) as minMileage, MAX(Adverts.${mileageColumn}) as maxMileage`)
    .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(color ? "adverts.color = :color" : "1=1", { color })
    .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
    .andWhere(model ? "adverts.model = :model" : "1=1", { model })
    .andWhere(minYear !== undefined ? "adverts.year >= :minYear" : "1=1", { minYear })
    .andWhere(maxYear !== undefined ? "adverts.year <= :maxYear" : "1=1", { maxYear })
    .andWhere(minPrice !== undefined ? "adverts.price >= :minPrice" : "1=1", { minPrice })
    .andWhere(maxPrice !== undefined ? "adverts.price <= :maxPrice" : "1=1", { maxPrice })
    .andWhere(minMileage !== undefined ? "adverts.mileage >= :minMileage" : "1=1", { minMileage })
    .andWhere(maxMileage !== undefined ? "adverts.mileage <= :maxMileage" : "1=1", { maxMileage })
    .getRawOne();

  const [brandAdvert, modelAdvert, fuelAdvert, colorAdvert] = await Promise.all(distinctPromises);

  return {
    brandAdvert: brandAdvert.map(item => item.brand),
    modelAdvert: modelAdvert.map(item => item.model),
    fuelAdvert: fuelAdvert.map(item => item.fuel),
    colorAdvert: colorAdvert.map(item => item.color),
    minYear: yearRange.minyear,
    maxYear: yearRange.maxyear,
    minPrice: priceRange.minprice,
    maxPrice: priceRange.maxprice,
    minMileage: mileageRange.minmileage,
    maxMileage: mileageRange.maxmileage,
  };
};
