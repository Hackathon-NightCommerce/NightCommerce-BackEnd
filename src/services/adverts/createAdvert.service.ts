import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { Adverts, CategoryProduct } from "../../entities/adverts.entities";
import {
  TAdvertRequest,
  TAdvertResponse,
} from "../../interfaces/advert.interfaces";
import { advertSchemaResponse } from "../../schemas/advert.schema";
import { imageGallerySchema } from "../../schemas/imageGallery.schema";
import { ImageGallery } from "../../entities/imageGallery.entities";

export const createAdvertService = async (
  advertData: TAdvertRequest,
  userId: number
): Promise<TAdvertResponse> => {
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
    category: advertData.category as CategoryProduct,
    user: user,
    cover_image: images ? images[0] : "",
  });

  await advertRepository.save(newAdvert);

  if (images) {
    const imageGalleryRepository = AppDataSource.getRepository(ImageGallery);
    const otherImages = images.splice(0, 1);
    const imagesMap = otherImages.map(async (item) => {
      const newImage = imageGalleryRepository.create({
        image: item,
        adverts: newAdvert,
      });

      await imageGalleryRepository.save(newImage);
      await newImages.push(imageGallerySchema.parse(newImage));
    });
    await Promise.all(imagesMap);
  }

  newAdvert.images = newImages;

  await advertRepository.save(newAdvert);

  console.log(newAdvert);
  
  return advertSchemaResponse.parse(newAdvert);
};
