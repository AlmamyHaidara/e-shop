import { PrismaClient, User } from "@prisma/client";
import { Response } from "express";
import { addToBlacklist } from "../middleware/middleware";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export default class UserController {
  prisma = new PrismaClient();
  register: any = async (req: any, res: Response) => {
    const data = req.body;
    /**
     * Vérifie si toutes les propriétés du corps de la requête sont vides
     * @type {boolean}
     */
    if (Object.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
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
            .json({ status: false, msg: "Cet utilisateur existe déjà" });
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            password = await bcrypt.hash(password, 12);
            const newUser = await this.prisma.user.create({
              data: {
                name,
                email,
                avatar,
                password,
              },
            });
            res.status(200).json({
              status: true,
              msg: "Utilisateur créé avec succès",
            });
          } else {
            console.log("Adresse email invalide");
            res
              .status(400)
              .json({ status: false, message: "Adresse email invalide" });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    }
  };

  updateUser: any = async (req: any, res: Response) => {
    const data = req.body;
    /**
     * Vérifie si toutes les propriétés du corps de la requête sont vides
     * @type {boolean}
     */
    if (Object.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
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
            const updatedUser = await this.prisma.user.update({
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
              msg: "Utilisateur modifié avec succès",
            });
          } else {
            console.log("Adresse email invalide");
            res
              .status(400)
              .json({ status: false, message: "Adresse email invalide" });
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
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    }
  };

  login = async (req: any, res: Response) => {
    const data = req.body;
    if (Object.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    } else {
      try {
        const { email, password } = data;
        const user: User | null = await this.prisma.user.findFirst({
          where: { email: email },
        });
        if (user) {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let payload = {
            time: Date(),
            userId: user.id,
          };

          const token = jwt.sign(payload, jwtSecretKey, {
            expiresIn: 86400,
          });

          res.status(200).json({ status: true, token: token });
        } else {
          res.status(404).json({
            status: false,
            message: "Vous n'avez pas de compte, vous devez vous inscrire",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    }
  };

  logout = async (req: any, res: Response) => {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
      return res.status(400).json({ msg: "Vous devez vous authentifier" });
    }

    addToBlacklist(token);
    res.status(200).json({ msg: "Déconnecté" });
  };
}
