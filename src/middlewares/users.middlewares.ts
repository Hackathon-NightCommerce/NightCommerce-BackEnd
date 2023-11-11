import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors"

export const userExistsCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, cpf } = req.body;


  const userRepository = AppDataSource.getRepository(Users);


  if(email || cpf){
    const existingUser = await userRepository.findOne({
      where: [{ email }, { cpf }],
    });
    
      if (existingUser) {
        if (existingUser.email === email) {
     
          throw new AppError("This email already exists", 409);
        }
        if (existingUser.cpf === cpf) {
          throw new AppError("This cpf already exists", 409);
        }
      }
  }
  
  return next();
};

export const userExistsbyId = async (req: Request, res: Response, next: NextFunction) => {;

  const id = req.params.id ? parseInt(req.params.id) : res.locals.userId

  const userRepository = AppDataSource.getRepository(Users);

  const existingUser = await userRepository.findOne({
    where: [{ id }],
  });

  if (!existingUser) {
      throw new AppError("This user is not exists", 409);
  }

  return next();
};

export const isOwnerOrAdminUser = async (req: Request, res: Response, next: NextFunction) => {

  const userId = req.params.id ? parseInt(req.params.id) : res.locals.userId

  const repository = AppDataSource.getRepository(Users)

  const user = await repository.findOne({
    where: { id: res.locals.userId }
  });


  const userFind = await repository.findOne({
    where: { id: userId }
  });


  if (user?.type_user === "admin" || user?.id == userFind?.id) {
    return next()
  }

  throw new AppError(`This does not belong to you`, 401)
}