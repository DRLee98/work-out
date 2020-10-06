import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "운동일지";
    res.locals.routes = routes;
    next();
};