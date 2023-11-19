import { MercadoPagoConfig, Preference } from 'MercadoPago';
import {TMethodPaymentRequest} from '../../interfaces/cart.interfaces';
import "dotenv/config";

export const mercadoPagoService = ({products}:TMethodPaymentRequest)=>{

    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN as string});
    const preference = new Preference(client);

    preference.create({
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
                }
        }
    }).then((result) => console.log(result))
          .catch((error) => console.log(error));

}