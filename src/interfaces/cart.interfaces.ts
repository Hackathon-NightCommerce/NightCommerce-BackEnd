import {z} from 'zod';
import {cartSchemaRequest} from '../schemas/cart.schema';
import { userSchemaResponseItemsCart } from '../schemas/user.schema';

export type TCartRequest = z.infer<typeof cartSchemaRequest>

export type TUserResponseItemsCart = z.infer<typeof userSchemaResponseItemsCart>