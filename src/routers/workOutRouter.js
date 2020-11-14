import express from "express";
import { getDayWorkOut, getAdd, getEditDay, postEditDay } from "../controllers/workOutController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const workOutRouter = express.Router();

workOutRouter.get(routes.day, onlyPrivate, getDayWorkOut);

workOutRouter.get(routes.add, onlyPrivate, getAdd);

workOutRouter.get(routes.editDay(), onlyPrivate, getEditDay);
workOutRouter.post(routes.editDay(), onlyPrivate, postEditDay);

export default workOutRouter;
