import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entities";
import { Users, UserType } from "../../entities/users.entities";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";

export const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const { address, type_user, ...userFields } = userData;

  const addressRepository = AppDataSource.getRepository(Address);

  const userRepository = AppDataSource.getRepository(Users);

  const newAddress = addressRepository.create(address);

  await addressRepository.save(newAddress);

  const userType: UserType = type_user as UserType;

  const newUser = userRepository.create({
    ...userFields,
    type_user: userType,
    address: newAddress,
  });

  await userRepository.save(newUser);

  return userSchemaResponse.parse(newUser);
};
