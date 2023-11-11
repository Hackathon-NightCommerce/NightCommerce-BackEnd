import { AppDataSource } from "../../data-source";
import { ImageGallery } from "../../entities/imageGallery.entities";

export const deleteImgAdvertService = async (
  imageId: number
): Promise<void> => {
  const imageRepository = AppDataSource.getRepository(ImageGallery);

  const image = await imageRepository.findOneByOrFail({ id: imageId });
  
  await imageRepository.remove(image);
};
