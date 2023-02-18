// import{Request,Response,NextFunction} from 'express'
import jwt from "jsonwebtoken";
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("no autorizado");
    return res.status(401).json({ message: "no estas autorizado" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("no autorizado");
    return res.status(401).json({ message: "no estas autorizado" });
  }

  jwt.verify(token, process.env.TOKEN_JWT, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "no estas autorizado" });
    }
    req.user = user;
    next();
  });
};

export const simpleAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_JWT, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "no estas autorizado" });
    }
    req.user = user;
    next();
  });
};
