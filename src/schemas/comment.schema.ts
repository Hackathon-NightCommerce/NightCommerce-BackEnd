import { z } from "zod"
import { userSchema } from "./user.schema"

export const commentSchema = z.object({
  id: z.number(),
  comment: z.string(),
  stars:z.number(),
  user: z.number(),
  advert: z.number(),
  created_at: z.date(),
})

export const commentSchemaResponse = commentSchema
  .omit({
    advert: true,
  })
  .extend({
    user: userSchema.pick({
      id: true,
      name: true,
    }),
  })

export const commentSchemaReadAllCommentAdvert = z.array(commentSchemaResponse)

export const commentSchemaRequest = commentSchema.pick({ comment: true, stars:true })
