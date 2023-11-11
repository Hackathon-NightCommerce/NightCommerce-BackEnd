import {Request, Response, NextFunction} from 'express';
import { updateCommentService } from '../../services/comments/updateComment.service';

export const updateCommentController = async(req:Request,res:Response,next:NextFunction)=>{

    const result = await updateCommentService(Number(req.params.id),req.body);

    return res.status(200).json(result);
}