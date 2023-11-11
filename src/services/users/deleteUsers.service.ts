import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";

export const deleteUserService = async (userId: number): Promise<void> => {

  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneByOrFail({ id: userId });

  await userRepository.remove(user);

};
