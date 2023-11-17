import {Request,Response} from 'express';
import {updateConfirmedAccountUserService} from '../../services/users/updateConfirmedAccountUser.service';

export const updateConfirmedAccountUserController = async (req:Request,res:Response):Promise<Response>=>{

    await updateConfirmedAccountUserService(Number(req.params.id));
    return res.json('Parabens sua conta foi confirmado com sucesso')
}