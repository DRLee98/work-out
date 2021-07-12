import express from "express";
import { home, search } from "../controllers/globalController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";
import routes from "../routes";
import { upload } from "../upload";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(
  routes.join,
  onlyPublic,
  upload.single("profile"),
  postJoin,
  postLogin,
);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.search, search);

export default globalRouter;
