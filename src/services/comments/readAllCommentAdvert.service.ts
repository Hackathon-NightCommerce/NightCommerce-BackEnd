import {Adverts} from '../../entities/products.entities';
import {AppDataSource} from '../../data-source';

export const readAllCommentsAdvertService = async(idAdvert:number)=>{


    const repAdvert = AppDataSource.getRepository(Adverts);

    const advert = await repAdvert.find({
        where:{
            id:idAdvert
        },
        relations:{
            comments:{
                user:true
            }
            
        }
        
    })

    return advert[0].comments
}