import { z } from "zod"
import { loginSchema } from "../schemas/login.schema"
import { TUserResponse } from "./user.interfaces"

export type TLogin = z.infer<typeof loginSchema>

export interface loginResponse {
  token: string,
  user: TUserResponse
}
