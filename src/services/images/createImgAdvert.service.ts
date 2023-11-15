import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { ImageGallery } from "../../entities/imageGallery.entities";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";
import { imageGallerySchema } from "../../schemas/imageGallery.schema";

export const createImgAdvertService = async (
  url: string,
  advertId: number
): Promise<TImageGalleryResponse> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const imageGalleryRepository = AppDataSource.getRepository(ImageGallery);

  const advert = await advertRepository.findOneByOrFail({ id: advertId });

  const newImage = imageGalleryRepository.create({
    image: url,
    adverts: advert,
  });

  await imageGalleryRepository.save(newImage);

  return imageGallerySchema.parse(newImage);
};
