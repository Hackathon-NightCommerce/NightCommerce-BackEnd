import { Request, Response } from "express";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { updateUserService } from "../../services/users/updateUsers.service";

export const updateUserController = async (
    req: Request,
    res: Response
): Promise<Response<TUserResponse>> => {
    
    const User: TUserRequest = req.body;

    const updateUser: TUserResponse = await updateUserService(Number(res.locals.userId), User);

    return res.json(updateUser);
};
