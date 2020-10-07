import express from "express";
import {
  getAddWorkOut,
  postAddWorkOut,
  editWorkOut,
} from "../controllers/workOutController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const workOutRouter = express.Router();

workOutRouter.get(routes.addWorkOut, onlyPrivate, getAddWorkOut);
workOutRouter.post(routes.addWorkOut, onlyPrivate, postAddWorkOut);

workOutRouter.get(routes.editWorkOut(), onlyPrivate, editWorkOut);

workOutRouter.post(routes.deleteWorkOut(), onlyPrivate);

export default workOutRouter;
