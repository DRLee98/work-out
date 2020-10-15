import express from "express";
import {
  getDayWorkOut,
  getAddWorkOut,
  postAddWorkOut,
  getEditDay,
  postEditDay,
  getEditWorkOut,
  postEditWorkOut,

} from "../controllers/workOutController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const workOutRouter = express.Router();

workOutRouter.get(routes.day, onlyPrivate, getDayWorkOut);

workOutRouter.get(routes.addWorkOut, onlyPrivate, getAddWorkOut);
workOutRouter.post(routes.addWorkOut, onlyPrivate, postAddWorkOut);

workOutRouter.get(routes.editDay(), onlyPrivate, getEditDay);
workOutRouter.post(routes.editDay(), onlyPrivate, postEditDay);

workOutRouter.get(routes.editWorkOut(), onlyPrivate, getEditWorkOut);
workOutRouter.post(routes.editWorkOut(), onlyPrivate, postEditWorkOut);

workOutRouter.post(routes.deleteWorkOut(), onlyPrivate);

export default workOutRouter;
