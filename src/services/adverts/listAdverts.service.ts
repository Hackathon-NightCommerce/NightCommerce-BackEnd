import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { Repository } from 'typeorm';
import { IPagination } from "../../interfaces/pagina.interface";
import {allAdvertSchema } from './../../schemas/advert.schema';

export const listAdvertService = async (
  pageReq: number,
  perPageReq: number,
  serverUrl: string
): Promise<IPagination> => {

  const prevPage: string | null = pageReq - 1 < 1 ? null : `${serverUrl}/adverts/?page=${pageReq - 1}&perPage=${perPageReq}`;
  const nextPage: string | null = `${serverUrl}/adverts/?page=${pageReq + 1}&perPage=${perPageReq}`;

  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const [findAdvert, totalCount] = await advertRepository.createQueryBuilder('adverts')
    .leftJoinAndSelect('adverts.user', 'Users')
    .orderBy('adverts.id', 'ASC')
    .take(perPageReq)
    .skip(perPageReq * (pageReq - 1))
    .getManyAndCount();

  const totalPages = Math.ceil(totalCount / perPageReq);

  const nextAdverts = await advertRepository.find({
    take: perPageReq,
    skip: perPageReq * pageReq
  });
  
  const parsedAdverts = allAdvertSchema.parse(findAdvert);
  
  

  const pagination = {
    prevPage,
    nextPage: nextAdverts.length > 0 ? nextPage : null,
    totalPages,
    data: parsedAdverts
  };

  return pagination;
};
