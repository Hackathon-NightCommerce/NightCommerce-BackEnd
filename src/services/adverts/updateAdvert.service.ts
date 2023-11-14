import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/products.entities";
import { AppError } from "../../errors";
import { TAdvertRequestUpdate, TAdvertResponse } from "../../interfaces/advert.interfaces";
import { advertSchemaResponse } from "./../../schemas/advert.schema";
import { DeepPartial } from "typeorm";

export const updateAdvertService = async (
  advertId: number,
  userId: number,
  advertData: TAdvertRequestUpdate
): Promise<TAdvertResponse> => {

  const advertRepository = AppDataSource.getRepository(Adverts);

  const oldDataAdvert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!oldDataAdvert) {
    throw new AppError("Advert not found", 404);
  }

  await advertRepository
    .createQueryBuilder()
    .update(Adverts)
    .set({
      ...oldDataAdvert,
      ...advertData,
    } as DeepPartial<Adverts>)
    .where("id = :id", { id: advertId })
    .execute();

  const updatedAdvert = await advertRepository.findOne({
    where: { id: advertId },
    relations: {
      user: true
    }
  });

  if (!updatedAdvert) {
    throw new AppError("Failed to retrieve updated advert", 500);
  }

  const validateResponse = advertSchemaResponse.parse(updatedAdvert);

  return advertSchemaResponse.parse(validateResponse);
};
