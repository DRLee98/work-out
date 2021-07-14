import express from "express";
import { postAddComment } from "../controllers/postController";
import {
  postAddWorkOut,
  postEditWorkOut,
  postDeleteWorkOut,
  postChangeOrder,
} from "../controllers/workOutController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addWorkOut, postAddWorkOut);
apiRouter.post(routes.editWorkOut, postEditWorkOut);
apiRouter.post(routes.deleteWorkOut, postDeleteWorkOut);
apiRouter.post(routes.changeOrder, postChangeOrder);
apiRouter.post(routes.addComment(), onlyPrivate, postAddComment);

export default apiRouter;
