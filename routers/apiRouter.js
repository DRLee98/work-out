import express from "express";
import {
  postAddWorkOut,
  postEditWorkOut,
  postDeleteWorkOut,
  postChangeOrder
} from "../controllers/workOutController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addWorkOut, postAddWorkOut);
apiRouter.post(routes.editWorkOut, postEditWorkOut);
apiRouter.post(routes.deleteWorkOut, postDeleteWorkOut);
apiRouter.post(routes.changeOrder, postChangeOrder);

export default apiRouter;