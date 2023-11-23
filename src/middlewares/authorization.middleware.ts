import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/users.entities";

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    throw new AppError("Unauthorized: Token missing", 401);
  }
  const splitToken = token.split(" ")[1];

  Jwt.verify(splitToken, process.env.SECRET_KEY!, (err: any, decoded: any) => {

    if (err) {
      throw new AppError("Invalid token", 401);
    }
    res.locals.userId = decoded.subject;
    return next();
  });
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.userId;

  const repository = AppDataSource.getRepository(Users);

  const user = await repository.findOne({
    where: { id: userId },
  });

  if (user!.type_user !== "admin") {
    throw new AppError(`You are not an admin`, 401);
  }

  return next();
};

export const adminCantUseRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(res.locals.userId);
  const userRepo = AppDataSource.getRepository(Users);

  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
  });
  if (user?.type_user == "admin") {
    throw new AppError("Admins can't use this route", 409);
  }

  return next();
};
