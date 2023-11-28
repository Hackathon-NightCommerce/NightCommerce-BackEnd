import { Router } from "express";
import {verifyAuthToken} from '../middlewares/authorization.middleware';
import { schemaValidator } from "../middlewares/schema.middlewares";
import {cartSchemaRequest} from '../schemas/cart.schema';
import {createCartController} from '../controllers/cart/createCart.controller';
import {getItemsCartController} from '../controllers/cart/getItemsCart.controller';

export const cartRoutes = Router();

cartRoutes.post('/',verifyAuthToken,schemaValidator(cartSchemaRequest),createCartController)
cartRoutes.get('/',verifyAuthToken,getItemsCartController)