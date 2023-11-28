import { z } from "zod"
import {
  userAdvertsSchema,
  userSchema,
  userSchemaRequest,
  userSchemaRequestUpdate,
  userSchemaResponse,
  userSchemaSendEmailNotificationSales
} from "../schemas/user.schema"


export type IEmailRequest = {
  to: string,
  subject: string,
  text: string
}

export type TUser = z.infer<typeof userSchema>

export type TUserRequest = z.infer<typeof userSchemaRequest>

export type TUserResponse = z.infer<typeof userSchemaResponse>

export type TUserRequestUpdate = z.infer<typeof userSchemaRequestUpdate>

export type TUserAdverts = z.infer<typeof userAdvertsSchema>

export type TUserSendEmailNotificationSales = z.infer<typeof userSchemaSendEmailNotificationSales>

