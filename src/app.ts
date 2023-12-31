import "express-async-errors";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { handleAppError } from "./errors";
import { userRoutes } from "./routes/users.routes";
import { advertsRoutes } from "./routes/adverts.routes";
import { imageGalleryRoutes } from "./routes/imageGallery.routes";
import { commentsRoutes } from "./routes/comments.routes";
import { loginRoutes } from "./routes/login.routes";
import { sendRoutes } from "./routes/sendEmailPassword.routes";
import swaggerDocument from "./swagger.json";
import { cartRoutes } from "./routes/cart.routes";
import { uploadRoutes } from "./routes/uploadFile.routes";
import { routesPayment } from "./routes/payment.routes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());

app.use(cors({}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/adverts", advertsRoutes);
app.use("/adverts/images", imageGalleryRoutes);
app.use("/recoverPassword", sendRoutes);
app.use("/comments", commentsRoutes);
app.use("/cart", cartRoutes);
app.use("/uploadFile", uploadRoutes);
app.use("/payment", routesPayment);

app.use(handleAppError);

export default app;
