import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"
import {
  TUserResponse,
  TUserRequestUpdate,
} from "../../interfaces/user.interfaces"
import { userSchemaResponse } from "../../schemas/user.schema"
import { Address } from "./../../entities/address.entities"

export const updateUserService = async (
  userId: number,
  userData: TUserRequestUpdate
): Promise<TUserResponse> => {
  const userRepository = AppDataSource.getRepository(Users)

  const user = await userRepository.findOneOrFail({
    where: { id: userId },
    relations: {
      address: true,
    },
  })

  if (userData.address) {

    const addressRepository = AppDataSource.getRepository(Address)

    const address = await addressRepository.findOneByOrFail({
      id: user.address.id,
    })

    const updatedAddress = Object.assign(address, userData.address)

    await addressRepository.save(updatedAddress)

    userData.address = updatedAddress

  }
  const updatedUser = Object.assign(user, userData)

  await userRepository.save(updatedUser)

  const userUpdate = await userRepository.findOne({
    where: { id: userId },
    relations: {
      address: true,
    },
  })

  return userSchemaResponse.parse(userUpdate)
}
