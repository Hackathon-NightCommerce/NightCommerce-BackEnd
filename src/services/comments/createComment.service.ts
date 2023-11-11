import {Comments} from '../../entities/comments.entities';
import {AppDataSource} from '../../data-source';
import { Users } from '../../entities/users.entities';
import { Repository } from 'typeorm';
import { commentSchemaResponse } from '../../schemas/comment.schema';

export const createCommentsService = async(userId:number,advertId:number,comments:string)=>{

    const commentRepository = AppDataSource.getRepository(Comments);
    const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({
        where:{id:userId}
        
    })
    
    const newComments = commentRepository.create({
        comment:comments,
        user:user!,
        advert:{id:advertId},
        
    });
    
    await commentRepository.save(newComments);

    

    return commentSchemaResponse.parse(newComments);
    
    
}