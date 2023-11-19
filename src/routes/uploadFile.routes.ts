import {Router} from 'express';
import { adminCantUseRoute, verifyAuthToken } from '../middlewares/authorization.middleware';
import multer from 'multer';
import {uploadFileController} from '../controllers/uploadFile/uploadFile.controller';

export const uploadRoutes = Router();
const multerConfig = multer()


uploadRoutes.post('/',verifyAuthToken,adminCantUseRoute,multerConfig.single('file'),uploadFileController)