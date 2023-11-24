import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";
import {advertSchemaResponse } from "./../../schemas/advert.schema";
import { Repository } from 'typeorm';

export const listOneAdvertService = async (
  advertId: number
): Promise<TAdvertResponse> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOneOrFail({
    where: { id: advertId },
    relations: { user:true, images: true, comments: {user:true} }
  });
  
  return advertSchemaResponse.parse(advert);
};
