import {Router} from 'express';
import { adminCantUseRoute, verifyAuthToken } from '../middlewares/authorization.middleware';
import {schemaValidator} from '../middlewares/schema.middlewares';
import {paymentSchemaRequest} from '../schemas/cart.schema';
import {createPaymentController} from '../controllers/payment/createPayment.controller';

export const routesPayment = Router();

routesPayment.post
    ('/',
    verifyAuthToken,
    adminCantUseRoute,
    schemaValidator(paymentSchemaRequest),
    createPaymentController
    )