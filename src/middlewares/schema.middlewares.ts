import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";



export const schemaValidator = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) :void=> {
    
    
    const validateData = schema.parse(req.body)
    


    req.body = validateData

    
    return next()

}