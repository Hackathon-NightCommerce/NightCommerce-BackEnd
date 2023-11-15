import { AppDataSource } from "../../data-source"
import { Adverts } from "../../entities/adverts.entities"
import { AppError } from "../../errors"

export const deleteAdvertService = async (advertId: number): Promise<void> => {
  const advertRepository = AppDataSource.getRepository(Adverts)
  const advertisement = await advertRepository.findOne({
    where: { id: advertId }
    
  })

  if (!advertisement) {
    throw new AppError("Advert not found", 404)
  }

  await advertRepository.remove(advertisement)
}
