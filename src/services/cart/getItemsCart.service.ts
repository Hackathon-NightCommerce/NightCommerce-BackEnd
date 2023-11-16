import { Repository } from 'typeorm';
import {AppDataSource} from '../../data-source';
import { Users } from '../../entities/users.entities';

export const getItemsCartService = async (userId:number)=>{
    const userRepository: Repository<Users> = AppDataSource.getRepository(Users);
    
    const user = await userRepository.findOne({
        where: { id: userId },
        relations: ['itemsCart', 'itemsCart.advert_id'],
      });

    return user
}