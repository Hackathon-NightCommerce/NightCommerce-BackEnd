import { Request, Response } from "express";
import { listAllUserAdvertsService } from "../../services/users/listAllUserAdverts.service";


export const listAllUserAdvertsController = async (req: Request, res: Response): Promise<Response> => {
    
   const { id } = req.params
   
    const userAdverts = await listAllUserAdvertsService(Number(id))

    return res.status(200).json(userAdverts)
 }