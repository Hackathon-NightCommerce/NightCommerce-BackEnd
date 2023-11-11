import {Comments} from '../../entities/comments.entities';
import {AppDataSource} from '../../data-source';
import {TCommentRequest} from '../../interfaces/comment.interfaces';

export const updateCommentService = async(idComment:number,data:TCommentRequest)=>{

    const repComment = AppDataSource.getRepository(Comments);
    const getComment = await repComment.findOne({where:{id:idComment}});

    const newComment = Object.assign({},getComment, data);
    await repComment.save(newComment);

    return newComment;
}