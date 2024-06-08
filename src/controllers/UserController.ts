import { PrismaClient } from "@prisma/client";
import { Response } from "express";
const bcrypt = require("bcrypt");

export default class UserController {
  prisma = new PrismaClient();
  createUser: any = async (req: any, res: Response) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      try {
        let { email, password, name, avatar } = data;
        const user = await this.prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        console.log(user);
        if (user) {
          res
            .status(200)
            .json({ status: false, msg: "ce utilisateur existe deja" });
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            password = await bcrypt.hash(password, 12);
            const user = await this.prisma.user.create({
              data: {
                name,
                email,
                avatar,
                password,
              },
            });

            res.status(200).json({
              status: true,
              msg: "Utilisateur creer avec succes",
            });
          } else {
            console.log("Invalid email address");
            res
              .status(400)
              .json({ status: false, message: "Addresse email invalide" });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  updateUser: any = async (req: any, res: Response) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      try {
        let { email, name, avatar } = data;
        const user = await this.prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (user) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            const user = await this.prisma.user.update({
              where: {
                email: email,
              },
              data: {
                name: name,
                avatar: avatar,
              },
            });

            res.status(200).json({
              status: true,
              msg: "Utilisateur modifier avec succes",
            });
          } else {
            console.log("Invalid email address");
            res
              .status(400)
              .json({ status: false, message: "Addresse email invalide" });
          }
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Cet utilisateur n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };
}
