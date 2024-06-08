import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { userRoute } from "./routers/user.routes";

const app = express();

app.use(express.json());
app.use(userRoute);

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
