import { Request, Response } from "express"
import { deleteUserService } from "../../services/users/deleteUsers.service"

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  
    await deleteUserService(Number(req.params.id));

  return res.status(204).send();
};
