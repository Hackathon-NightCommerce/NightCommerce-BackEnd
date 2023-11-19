import { Router } from "express";
// import { createAdvertsController } from "../controllers/adverts/createAdverts.controller";
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller";
import { listOneAdvertsController } from "../controllers/adverts/listOneAdvert.controller";
import { deleteAdvertsController } from "../controllers/adverts/deleteAdverts.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import {
  advertSchemaRequest,
  advertSchemaRequestUpdate,
} from "../schemas/advert.schema";
// import { filteredAdvertsController } from "./../controllers/adverts/listfiltersAdverts.controller";
import { updateAdvertsController } from "../controllers/adverts/updateAdverts.controller";
// import { createFiltersAdvertController } from "./../controllers/adverts/createFiltesAdvert.controller ";
import { adminCantUseRoute, verifyAuthToken } from "../middlewares/authorization.middleware";
import {
  advertsExistsbyId,
  isOwnerAdverts,
} from "../middlewares/adverts.middlewares";

export const advertsRoutes = Router();

// advertsRoutes.get("/adverts-filters", createFiltersAdvertController);

// advertsRoutes.get("/filtered", filteredAdvertsController);

advertsRoutes.get("/", listAdvertsController);

advertsRoutes.get("/:id", advertsExistsbyId, listOneAdvertsController);

advertsRoutes.post(
  "/",
  verifyAuthToken,
  adminCantUseRoute,
  schemaValidator(advertSchemaRequest),
  // createAdvertsController
);

advertsRoutes.patch(
  "/:id",
  verifyAuthToken,
  adminCantUseRoute,
  advertsExistsbyId,
  isOwnerAdverts,
  schemaValidator(advertSchemaRequestUpdate),
  updateAdvertsController
);

advertsRoutes.delete(
  "/:id",
  verifyAuthToken,
  advertsExistsbyId,
  isOwnerAdverts,
  deleteAdvertsController
);
