import { Request, Response, NextFunction } from "express";
import { Comments } from "../entities/comments.entities";
import { Users } from "../entities/users.entities";
import { AppDataSource } from "../data-source";
import { AppError } from "./../errors";

export const isOwnerComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(res.locals.userId);
  const commentId = Number(req.params.id);

  const repComment = AppDataSource.getRepository(Comments);
  const repuser = AppDataSource.getRepository(Users);

  const [comment, user] = await Promise.all([
    repComment.findOne({ where: { id: commentId }, relations: { user: true } }),

    repuser.findOne({ where: { id: userId } }),
  ]);

  if (req.method == "PATCH") {
    if (comment?.user.id == userId) {
      return next();
    }else{
        throw new AppError(`This does not belong to you`, 401);
    }

  } else if(user?.type_user === 'admin') {
    return next()
    
  }else{

    if (comment?.user.id == userId) {
      return next();
    }

    throw new AppError(`This does not belong to you`, 401);
  }
};

export const commentExistsbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  const repComment = AppDataSource.getRepository(Comments);

  const verifyComment = await repComment.findOne({
    where: [{ id }],
  });

  if (!verifyComment) {
    throw new AppError("This Comment is not exists", 404);
  }

  return next();
};
