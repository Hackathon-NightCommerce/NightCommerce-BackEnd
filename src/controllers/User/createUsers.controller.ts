import { Request, Response } from "express";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { createUserService } from "../../services/users/createUsers.service";

export const createUsersController = async (req: Request, res: Response): Promise<Response<TUserResponse>> => {
  const users: TUserRequest = req.body;

  const newUsers: TUserResponse = await createUserService(users);

  return res.status(201).json(newUsers);
};
