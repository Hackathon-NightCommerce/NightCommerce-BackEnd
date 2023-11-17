import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/users.entities"

export const updateConfirmedAccountUserService = async (idUser:number):Promise<void>=>{

    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOne({
        where: { id: idUser },
      })

      if(user){
        user.confirmed = true
        userRepository.save(user)
      }
}