import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";
import flash from "connect-flash";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import workOutRouter from "./routers/workOutRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.workOut, workOutRouter);

export default app;
