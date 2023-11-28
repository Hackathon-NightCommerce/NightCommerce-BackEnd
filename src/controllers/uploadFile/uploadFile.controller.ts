import { Request, Response } from "express";
import { Readable } from "stream";
import readline from "readline";
import { CategoryProduct } from "../../entities/adverts.entities";
import { createAdvertService } from "../../services/adverts/createAdvert.service";
import { TAdvertRequest } from "../../interfaces/advert.interfaces";

export const uploadFileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { file }: Request = req;
  const { buffer } = file as Express.Multer.File;
  const readableFile = new Readable();

  const products: TAdvertRequest[] = [];

  readableFile.push(buffer);
  readableFile.push(null);

  const productsLine = readline.createInterface({
    input: readableFile,
  });

  for await (let line of productsLine) {
    const productsLineSplit = line.split(",");

    products.push({
      name: productsLineSplit[0],
      brand: productsLineSplit[1],
      price: Number(productsLineSplit[2]),
      description: productsLineSplit[3],
      images: [productsLineSplit[4]],
      information_additional: productsLineSplit[5],
      category: productsLineSplit[6] as CategoryProduct,
      published: productsLineSplit[7].toLowerCase().trim() === "true",
      qtd: Number(productsLineSplit[8]),
      promotion: productsLineSplit[9].toLowerCase().trim() === "true",
    });
  }
  products.splice(0, 1);

  Promise.all(
    products.map(async (product) => {
      await createAdvertService(product, Number(res.locals.userId));
    })
  );

  return res.json(`Produtos criado com sucesso`).status(201);
};
