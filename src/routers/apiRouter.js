import express from "express";
import {
  postAddComment,
  postAddReply,
  postToggleLike,
} from "../controllers/postController";
import {
  postAddCompleteDate,
  postGetCompleteDate,
} from "../controllers/userController";
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
apiRouter.post(routes.addReply(), onlyPrivate, postAddReply);
apiRouter.post(routes.likePost(), onlyPrivate, postToggleLike);
apiRouter.post(routes.addCompleteDate, onlyPrivate, postAddCompleteDate);
apiRouter.post(routes.getCompleteDate, onlyPrivate, postGetCompleteDate);

export default apiRouter;
