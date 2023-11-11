import { AppDataSource } from "../../data-source";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { Repository } from 'typeorm';
import { Users } from "../../entities/users.entities";
import { userSchemaResponse } from '../../schemas/user.schema';

export const listOneUserService = async (userId: number): Promise<TUserResponse> => {

  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.address', 'address')
    .where('user.id = :id', { id: userId })
    .getOneOrFail()

  return userSchemaResponse.parse(user);
};
