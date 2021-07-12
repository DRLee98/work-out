import express from "express";
import {
  getEditProfile,
  postEditProfile,
  userDetail,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";
import { upload } from "../upload";

const userRouter = express.Router();

userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile(),
  upload.single("profile"),
  onlyPrivate,
  postEditProfile,
);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
