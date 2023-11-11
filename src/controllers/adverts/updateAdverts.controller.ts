import { Request, Response } from "express"
import { updateAdvertService } from "../../services/adverts/updateAdvert.service"
import {
  TAdvertRequestUpdate,
  TAdvertResponse,
} from "../../interfaces/advert.interfaces"

export const updateAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse>> => {
  const advert: TAdvertRequestUpdate = req.body

  const userId = Number(res.locals.userId)

  const updateAdverts: TAdvertResponse = await updateAdvertService(Number(req.params.id), userId, advert)

  return res.json(updateAdverts)
}
