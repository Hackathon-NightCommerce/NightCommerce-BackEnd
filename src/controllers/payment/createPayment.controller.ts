import {Request,Response} from 'express';
import {paymentService} from '../../services/payments/mercadoPago.service';
import {TMethodPaymentRequest} from '../../interfaces/cart.interfaces';

export const createPaymentController = async (req:Request, res:Response):Promise<void | Response>=>{

    const {products}:TMethodPaymentRequest = req.body
    const linkPage = await paymentService({products} as TMethodPaymentRequest)

    return res.json(linkPage)

}