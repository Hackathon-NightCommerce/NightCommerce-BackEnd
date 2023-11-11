import { Router} from "express";
import { adminCantUseRoute,verifyAuthToken } from "../middlewares/authorization.middleware";
import { advertsExistsbyId} from "../middlewares/adverts.middlewares";
import { createCommentController } from "../controllers/comments/createComment.controller";
import { readAllCommentAdvertController } from "../controllers/comments/readAllCommentAdvert.controller";
import { deleteCommentController } from "../controllers/comments/deleteComment.controller";
import { commentExistsbyId, isOwnerComments} from "../middlewares/comments.middlewares";
import { updateCommentController } from "../controllers/comments/updateComment.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { commentSchemaRequest } from "../schemas/comment.schema";

export const commentsRoutes = Router();

commentsRoutes.post(
  "/advert/:id/",
  verifyAuthToken,
  advertsExistsbyId,
  adminCantUseRoute,
  schemaValidator(commentSchemaRequest),
  createCommentController
);
commentsRoutes.get("/advert/:id",advertsExistsbyId,readAllCommentAdvertController);
commentsRoutes.patch("/:id",verifyAuthToken,adminCantUseRoute,commentExistsbyId,isOwnerComments,schemaValidator(commentSchemaRequest),updateCommentController);
commentsRoutes.delete("/:id", verifyAuthToken,commentExistsbyId,isOwnerComments,deleteCommentController);
