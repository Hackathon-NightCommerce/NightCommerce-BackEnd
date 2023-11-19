import {Request,Response} from 'express';
import {mercadoPagoService} from '../../services/payments/mercadoPago.service';
import {TMethodPaymentRequest} from '../../interfaces/cart.interfaces';

export const createPaymentController = async (req:Request, res:Response):Promise<void | Response>=>{

    const {methodPayment,products}:TMethodPaymentRequest = req.body

    if(methodPayment === 'mercadoPago'){
        mercadoPagoService({products} as TMethodPaymentRequest)
    }

    return res.send()

}