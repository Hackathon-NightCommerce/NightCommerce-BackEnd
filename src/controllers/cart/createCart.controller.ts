import {Request,Response} from 'express';
import {createCartSerive} from '../../services/cart/createCart.service';

export const createCartController = async (req:Request, res:Response):Promise<Response<string>>=>{

    await createCartSerive(req.body,Number(res.locals.userId))
    
    return res.status(201).json('Produtos salvos no carrinho com sucesso')

}