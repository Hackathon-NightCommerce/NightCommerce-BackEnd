import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { Adverts } from "../../entities/products.entities";
import { TAdvertRequest } from "../../interfaces/advert.interfaces";
import { advertSchemaResponse } from "./../../schemas/advert.schema";
import { ImageGallery } from "../../entities/imageGallery.entities";
import { imageGallerySchema } from "../../schemas/imageGallery.schema";

export const createAdvertService = async (
  advertData: TAdvertRequest,
  userId: number
): Promise<any> => {
  const userRepository = AppDataSource.getRepository(Users);
  const { images, ...rest } = advertData;
  const newImages: any = [];
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const advertRepository = AppDataSource.getRepository(Adverts);

  const newAdvert = advertRepository.create({
    ...rest,
    user: user,
  });

  await advertRepository.save(newAdvert);

  if (images) {
    const imageGalleryRepository = AppDataSource.getRepository(ImageGallery);
    const imagesMap = images.map(async (item) => {
      const newImage = imageGalleryRepository.create({
        image: item,
        adverts: newAdvert,
      });

      await imageGalleryRepository.save(newImage);
      await newImages.push(imageGallerySchema.parse(newImage));
      return imageGallerySchema.parse(newImage);
    });
    await Promise.all(imagesMap);
  }

  newAdvert.images = newImages;

  await advertRepository.save(newAdvert);


  return advertSchemaResponse.parse(newAdvert);
};
