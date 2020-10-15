import express from "express";
import {
  postAddWorkOut,
  postEditWorkOut
} from "../controllers/workOutController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addWorkOut, postAddWorkOut);
apiRouter.post(routes.editWorkOut, postEditWorkOut);

export default apiRouter;