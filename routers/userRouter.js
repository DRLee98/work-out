import express from "express";
import { changePassword, editProfile, userDetail } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;