import { TCommentResponse } from "../../interfaces/comment.interfaces";
import { createCommentsService } from "../../services/comments/createComment.service";
import { Request, Response } from 'express';

export const createCommentController = async (req: Request, res: Response) => {

    const result: TCommentResponse = await createCommentsService(res.locals.userId, Number(req.params.id), req.body.comment,Number(req.body.stars));

    return res.json(result).status(201);
}