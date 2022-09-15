import { errorMessage, joiValidator } from "iyasunday";
import Post from "../module/post";
import Comment from "../module/comment";
import Likes from "../module/likes";

export default (app) => {
  const version = "/v1";
  app.use(version, Post);
  app.use(version, Comment);
  app.use(version, Likes);


  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.httpStatusCode || 500).json(errorMessage(err));
    }
    return next();
  });

  app.use((req, res) => {
    res
      .status(404)
      .json({
        message: `Requested route ( ${req.get("HOST")}${
          req.originalUrl
        } ) not found`,
      });
  });
};
