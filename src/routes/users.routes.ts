import { Router } from "express";
import {
  userSchemaRequest,
  userSchemaRequestUpdate,
} from "../schemas/user.schema";
import {
  userExistsbyId,
  userExistsCreate,
  isOwnerOrAdminUser,
} from "./../middlewares/users.middlewares";
import { schemaValidator } from "../middlewares/schema.middlewares";
import {
  adminCantUseRoute,
  isAdmin,
  verifyAuthToken,
} from "../middlewares/authorization.middleware";
import { createUsersController } from "./../controllers/User/createUsers.controller";
import { listAllUsersController } from "./../controllers/User/listAllUsers.controller";
import { listOneUsersController } from "./../controllers/User/listOneUsers.controller";
import { updateUserController } from "./../controllers/User/updateUsers.controller";
import { deleteUserController } from "./../controllers/User/deleteUsers.controller";
import { listAllUserAdvertsController } from "./../controllers/User/listAllUserAdverts.controller";
import { updateConfirmedAccountUserController} from "../controllers/User/updateConfirmedAccountUser.controller";

export const userRoutes = Router();

userRoutes.post(
  "/",
  schemaValidator(userSchemaRequest),
  userExistsCreate,
  createUsersController
);
userRoutes.get("/all", verifyAuthToken, isAdmin, listAllUsersController);
userRoutes.get(
  "/:id",
  verifyAuthToken,
  userExistsbyId,
  isOwnerOrAdminUser,
  listOneUsersController
);
userRoutes.patch(
  "/",
  verifyAuthToken,
  adminCantUseRoute,
  userExistsbyId,
  schemaValidator(userSchemaRequestUpdate),
  userExistsCreate,
  updateUserController
);
userRoutes.delete(
  "/:id",
  verifyAuthToken,
  userExistsbyId,
  isOwnerOrAdminUser,
  deleteUserController
);
userRoutes.get("/:id/adverts", userExistsbyId, listAllUserAdvertsController);

userRoutes.patch(
  '/:id/confirmedAccount',
  userExistsbyId,
  updateConfirmedAccountUserController
);
