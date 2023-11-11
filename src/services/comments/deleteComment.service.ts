import {Comments} from '../../entities/comments.entities';
import {AppDataSource} from '../../data-source';

export const deleteCommentService = async(commentId:number)=>{

    const repComment = AppDataSource.getRepository(Comments);

    await repComment.delete({
        id:commentId
    })

}