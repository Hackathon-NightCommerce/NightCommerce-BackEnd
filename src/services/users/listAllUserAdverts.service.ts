import { Repository } from "typeorm"
import { TUserAdverts } from "../../interfaces/user.interfaces"
import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"
import { userAdvertsSchema } from "../../schemas/user.schema"

export const listAllUserAdvertsService = async (
  userId: number
): Promise<TUserAdverts> => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users)

  const userAdverts = await userRepository.findOneOrFail({
    where: { id: userId },
    relations: {
      adverts: { images: true },
    },
  })
  return userAdvertsSchema.parse(userAdverts)
}
