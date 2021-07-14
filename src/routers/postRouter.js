import express from "express";
import {
  getAddPost,
  getPostDetail,
  getPosts,
  postAddPost,
} from "../controllers/postController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";
import { upload } from "../upload";

const postRouter = express.Router();

postRouter.get(routes.home, onlyPrivate, getPosts);

postRouter.get(routes.addPost, onlyPrivate, getAddPost);
postRouter.post(
  routes.addPost,
  upload.array("images", 30),
  onlyPrivate,
  postAddPost,
);

postRouter.get(routes.postDetail(), onlyPrivate, getPostDetail);

export default postRouter;
