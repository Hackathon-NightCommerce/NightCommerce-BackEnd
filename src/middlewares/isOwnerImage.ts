import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Adverts } from "../entities/adverts.entities"
import { Users } from "../entities/users.entities"
import { AppError } from "./../errors"
import { ImageGallery } from "../entities/imageGallery.entities"

export const isOwnerImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(res.locals.userId)
  const imageId = Number(req.params.id)
  const method = String(req.method)
  const repository = AppDataSource.getRepository(ImageGallery)
  const repositoryUser = AppDataSource.getRepository(Users)

  const verifyUser = await repositoryUser.findOne({
    where: { id: userId },
  })

  const image = await repository.findOneOrFail({
    where: { id: imageId },
    relations: { adverts: { user: true } },
  })

  if (image!.adverts?.user.id == userId || verifyUser?.type_user == "admin") {
    return next()
  }

  throw new AppError(`This does not belong to you`, 401)
}
