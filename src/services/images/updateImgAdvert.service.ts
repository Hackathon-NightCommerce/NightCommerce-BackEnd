import { AppDataSource } from "../../data-source";
import { ImageGallery } from "../../entities/imageGallery.entities";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";
import { imageGallerySchemaResponse } from "./../../schemas/imageGallery.schema";

export const updateImgAdvertService = async (
  idImg: number,
  img: string
): Promise<TImageGalleryResponse> => {
  
  const imageRepository = AppDataSource.getRepository(ImageGallery);

  const image = await imageRepository.findOneOrFail({
    where: { id: idImg },
    relations: { adverts: true },
  });

  image.image = img;

  const updatedImage = await imageRepository.save(image);

  return imageGallerySchemaResponse.parse(updatedImage);
};
