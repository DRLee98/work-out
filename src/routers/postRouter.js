import express from "express";
import {
  getAddPost,
  getPosts,
  postAddPost,
} from "../controllers/postController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const postRouter = express.Router();

postRouter.get(routes.home, onlyPrivate, getPosts);

postRouter.get(routes.postDetail(), onlyPrivate);

postRouter.get(routes.addPost, onlyPrivate, getAddPost);
postRouter.post(routes.addPost, onlyPrivate, postAddPost);

export default postRouter;
