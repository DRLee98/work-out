import express from "express";
import { getAddWorkOut, postAddWorkOut, editWorkOut } from "../controllers/workOutController";
import routes from "../routes";

const workOutRouter = express.Router();

workOutRouter.get(routes.addWorkOut, getAddWorkOut);
workOutRouter.post(routes.addWorkOut, postAddWorkOut);

workOutRouter.get(routes.editWorkOut(), editWorkOut);

workOutRouter.post(routes.deleteWorkOut());

export default workOutRouter;