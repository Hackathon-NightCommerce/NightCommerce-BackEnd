import { Router } from "express"
import { loginController } from "../controllers/login/login.controller"
import { schemaValidator } from "../middlewares/schema.middlewares"
import { loginSchema } from "../schemas/login.schema"

export const loginRoutes = Router()

loginRoutes.post("/", schemaValidator(loginSchema), loginController)
