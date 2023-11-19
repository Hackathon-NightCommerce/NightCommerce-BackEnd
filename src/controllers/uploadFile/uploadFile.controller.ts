import {Request,Response} from 'express';
import {Readable} from 'stream';
import readline from 'readline';
import { category_product } from '../../entities/adverts.entities';
import { createAdvertService } from '../../services/adverts/createAdvert.service';

export interface Product {
    name: string;
    brand: string;
    price: number;
    description: string;
    cover_image: string;
    information_additional: string;
    category: category_product,
    published: boolean;
    qtd: number;
    promotion: boolean;
  }

  
export const uploadFileController = async (req:Request, res:Response):Promise<Response>=>{

    const {file}:Request = req
    const {buffer} = file as Express.Multer.File
    const readableFile = new Readable();

    const products:Product[] = []

    readableFile.push(buffer);
    readableFile.push(null);

    const productsLine = readline.createInterface({
        input:readableFile
    })

    for await(let line of productsLine){
        const productsLineSplit = line.split(',')

        products.push({
            name: productsLineSplit[0],
            brand: productsLineSplit[1],
            price: Number(productsLineSplit[2]),
            description: productsLineSplit[3],
            cover_image: productsLineSplit[4],
            information_additional: productsLineSplit[5],
            category: productsLineSplit[6] as unknown as category_product,
            published: productsLineSplit[7].toLowerCase().trim() === 'true',
            qtd: Number(productsLineSplit[8]),
            promotion: productsLineSplit[9].toLowerCase().trim() === 'true',
            
        })
    }
    products.splice(0,1)

    Promise.all(products.map(async (product)=>{
        await createAdvertService(product,Number(res.locals.userId))
    }))

    return res.json(`Produtos criado com sucesso`).status(201)
}