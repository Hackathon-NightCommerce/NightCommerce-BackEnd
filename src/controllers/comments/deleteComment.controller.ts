import { Request,Response} from 'express';
import {deleteCommentService} from '../../services/comments/deleteComment.service';

export const deleteCommentController = async(req:Request,res:Response)=>{

    await deleteCommentService(Number(req.params.id));

    return res.status(204).send()
}