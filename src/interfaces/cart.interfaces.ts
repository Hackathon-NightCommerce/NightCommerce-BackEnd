import {z} from 'zod';
import {cartSchemaRequest,paymentSchemaRequest} from '../schemas/cart.schema';
import { userSchemaResponseItemsCart } from '../schemas/user.schema';

export type TCartRequest = z.infer<typeof cartSchemaRequest>

export type TUserResponseItemsCart = z.infer<typeof userSchemaResponseItemsCart>

export type TMethodPaymentRequest = z.infer<typeof paymentSchemaRequest>