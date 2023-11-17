import {Request,Response} from 'express';
import {getItemsCartService} from '../../services/cart/getItemsCart.service';
import { userSchemaResponseItemsCart } from '../../schemas/user.schema';
import { TUserResponseItemsCart } from '../../interfaces/cart.interfaces';

export const getItemsCartController= async (req:Request,res:Response):Promise<Response<TUserResponseItemsCart>>=>{

    const user = await getItemsCartService(Number(res.locals.userId))
    const result:TUserResponseItemsCart = userSchemaResponseItemsCart.parse(user);

    return res.json(result)
}