import {Request,Response,NextFunction} from 'express';
import {AppDataSource} from '../data-source';
import {Adverts} from '../entities/adverts.entities';
import {Repository} from 'typeorm';
import {TMethodPaymentRequest} from '../interfaces/cart.interfaces';
import { AppError } from '../errors';
import {emailservice} from '../utils/sendEmail.utils';

export const checkQtdProductToPayment = async (req:Request,res:Response,next:NextFunction)=>{

    const {products}:TMethodPaymentRequest = req.body
    const advertRepository:Repository<Adverts> = AppDataSource.getRepository(Adverts);
    
    await Promise.all(
        products.map(async (productRequest)=>{
            const productResponse = await advertRepository.findOne(
                {where:{id:productRequest.advert_id},
                relations:{user:true}
            })

            if(!productResponse){
                throw new AppError(`The advert ${productRequest.name} not exists`, 404)

            }else if(productRequest.qtd <= productResponse.qtd && productResponse.qtd > 0){
                
                if(productResponse.qtd <= 5){

                   await emailservice.sendEmailNoticeProductStockDown(
                    productResponse.user.name,
                    productResponse.user.email,
                    productResponse.name,
                    productResponse.qtd
                   )

                }
            }else{
                throw new AppError(`The product ${productRequest.name} does not have enough quantity in stock`, 409)
            }
        })
    )
    next()    
}