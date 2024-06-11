import { NextFunction, Response } from "express";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res
        .status(403)
        .send({ status: false, msg: "Veuillez vous authentifier " });
    }

    if (isTokenBlacklisted(token)) {
      return res.status(401).json({ message: "Votre session a expiré" });
    }

    jwt.verify(
      token as string,
      jwtSecretKey,
      (err: any, decoded: { id: any }) => {
        if (err) {
          return res.status(401).send({
            message: "Vous n'est pas autorisé à accéder à ce compte",
          });
        }
        req.userId = decoded.id;
        next();
      }
    );
  } catch (error) {
    // Access Denied
    return false;
  }
};
const tokenBlacklist: Set<string> = new Set();

export const addToBlacklist = (token: string) => {
  tokenBlacklist.add(token);
};

const isTokenBlacklisted = (token: string): boolean => {
  return tokenBlacklist.has(token);
};
