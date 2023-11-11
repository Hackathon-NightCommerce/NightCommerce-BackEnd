import {Request,Response} from 'express';
import {readAllCommentsAdvertService} from '../../services/comments/readAllCommentAdvert.service';
import { commentSchemaReadAllCommentAdvert} from '../../schemas/comment.schema';



export const readAllCommentAdvertController = async(req:Request, res:Response)=>{

    const result = await readAllCommentsAdvertService(Number(req.params.id));
  
    const verify = commentSchemaReadAllCommentAdvert.parse(result);

    return res.status(200).json(verify);


}