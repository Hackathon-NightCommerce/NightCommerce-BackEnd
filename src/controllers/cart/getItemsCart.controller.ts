import {Request,Response} from 'express';
import {getItemsCartService} from '../../services/cart/getItemsCart.service';
import { userSchemaResponseItemsCart } from '../../schemas/user.schema';

export const getItemsCartController= async (req:Request,res:Response)=>{

    const user = await getItemsCartService(Number(res.locals.userId))
    const result = userSchemaResponseItemsCart.parse(user);

    return res.json(result)
}