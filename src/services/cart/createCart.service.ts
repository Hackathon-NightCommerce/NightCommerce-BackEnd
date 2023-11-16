import {TCartRequest} from '../../interfaces/cart.interfaces';
import {AppDataSource} from '../../data-source';
import { Repository } from 'typeorm';
import { ItemsCart } from '../../entities/items_cart.entities';
import { Users } from '../../entities/users.entities';
import {Adverts} from '../../entities/adverts.entities';

export const createCartSerive = async (data:TCartRequest,user_id:number)=>{
    
    const cartRepository = AppDataSource.getRepository(ItemsCart);
    const userRepository: Repository<Users> = AppDataSource.getRepository(Users);
    const advertsRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

    const user = await userRepository.findOne({
        where:{id:user_id}
        
    })
        await cartRepository.delete({
            user_id:user?.id!
        })

        data.products.map(async (product)=>{

            const advert = await advertsRepository.findOne({
                where:{id:product.advert_id}
                
            })
           const newCart = cartRepository.create({
                qtd:product.qtd,
                price:product.price,
                user_id:user?.id!,
                advert_id:advert?.id!
            })
           cartRepository.save(newCart)
        })
}