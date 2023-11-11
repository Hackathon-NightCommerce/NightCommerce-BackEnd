import { z } from "zod"
import { commentSchema, commentSchemaRequest, commentSchemaResponse} from "../schemas/comment.schema"

export type TComment = z.infer<typeof commentSchema>

export type TCommentRequest = z.infer<typeof commentSchemaRequest>

export type TCommentResponse = z.infer<typeof commentSchemaResponse>
