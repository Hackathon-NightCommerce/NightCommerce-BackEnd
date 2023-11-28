import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";
import { allAdvertSchema } from "../../schemas/advert.schema";
import { IPagination } from "../../interfaces/pagina.interface";

export const searchAdvertsService = async (
  searchTerm: string,
  serverUrl: string,
  pageReq: number,
  perPageReq: number
): Promise<IPagination> => {
  const advertRepository: Repository<Adverts> =
    AppDataSource.getRepository(Adverts);

  const perPage = Math.max(1, perPageReq);
  const skip = Math.max(0, (pageReq - 1) * perPage);

  const prevPage: string | null =
    pageReq - 1 < 1
      ? null
      : `${serverUrl}/adverts/?searchTerm=${searchTerm}&page=${
          pageReq - 1
        }&perPage=${perPageReq}`;
  const nextPage:
    | string
    | null = `${serverUrl}/adverts/?searchTerm=${searchTerm}&page=${
    pageReq + 1
  }&perPage=${perPageReq}`;

  const [adverts, total] = await advertRepository.findAndCount({
    where: [
      { name: ILike(`%${searchTerm}%`) },
      { brand: ILike(`%${searchTerm}%`) },
      { description: ILike(`%${searchTerm}%`) },
      { information_additional: ILike(`%${searchTerm}%`) },
    ],
    relations: { user: true, images: true, comments: { user: true } },
    skip: skip,
    take: perPage,
  });

  const totalPages = Math.ceil(total / perPage);
  const currentPage = pageReq;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    prevPage: hasPrevPage ? prevPage : null,
    nextPage: hasNextPage ? nextPage : null,
    totalPages: totalPages,
    data: allAdvertSchema.parse(adverts),
  };
};
