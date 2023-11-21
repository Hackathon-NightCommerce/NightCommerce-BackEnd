import { MercadoPagoConfig, Preference } from 'MercadoPago';
import {TMethodPaymentRequest} from '../../interfaces/cart.interfaces';
import {Adverts} from '../../entities/adverts.entities';
import "dotenv/config";
import { AppDataSource } from '../../data-source';
import { TUserSendEmailNotificationSales } from '../../interfaces/user.interfaces';
import {emailservice} from '../../utils/sendEmail.utils';

export const paymentService = async ({products}:TMethodPaymentRequest):Promise<string>=>{

    const advertRepository = AppDataSource.getRepository(Adverts);

    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN as string});
    const preference = new Preference(client);

    let linkPage:string = '';
    let emailSellers:TUserSendEmailNotificationSales[] = []

        await Promise.all(
            products.map(async (product)=>{
                const advert = await advertRepository.find(
                    {
                        where:{id:product.advert_id},
                        relations:{user:{address:true}}
                    })
                    emailSellers.push({
                        email: advert[0].user.email,
                        name: advert[0].user.name,
                        nameProduct:advert[0].name,
                        qtd:product.qtd,
                        price:product.price,
                        userAddress:advert[0].user
                    })
                    advert[0].qtd =  advert[0].qtd - product.qtd
                    advertRepository.save(advert[0])
                })
        )

        await emailservice.sendEmailNotificationSalesTemplate(emailSellers)

        await preference.create({
            body:{
                    items: products.map((product) => ({
                        id:product.advert_id.toString(),
                        title: product.name,
                        quantity: product.qtd,
                        currency_id: 'BRL',
                        unit_price: product.price,
                    })),
                    back_urls:{
                        success:'localhost:5173',
                        failure:'localhost:5173'
                    },
            },
            
        })
        .then((result) => {
            linkPage = result.init_point as string
        })
        .catch((error) => console.log(error));

    return linkPage
}
