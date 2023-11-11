import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors"


export const sendEmailMiddleware = async(req: Request, res: Response, next: NextFunction)=>{

    const userRepository = AppDataSource.getRepository(Users);

    const {email} = req.body;

    const existingEmail = await userRepository.findOne({
        where:{email}
      });

    if(existingEmail){
        next();
    }else{
        throw new AppError("This email not exists", 404);
    }
}