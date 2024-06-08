import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export default class PanierController {
  prisma = new PrismaClient();

  createPanier: any = async (req: any, res: Response) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      try {
        const { pid, uid, qte } = data;
        const panier = await this.prisma.panier.findMany({
          where: {
            pid: pid,
            uid: uid,
          },
        });
        if (panier) {
          const qt = panier[0].qte + qte;
          await this.prisma.panier.updateMany({
            where: {
              pid: pid,
              uid: uid,
            },
            data: {
              qte: qt,
            },
          });
          res.status(200).json({
            msg: "Mis a jour du Panier ${id}",
          });
        } else {
          const produit = await this.prisma.panier.create({
            data: {
              pid,
              uid,
              qte,
            },
          });

          res.status(200).json({
            status: true,
            msg: "panier creer avec succes",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };
  updatePanier: any = async (req: any, res: Response) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      try {
        const { id, qte } = data;

        await this.prisma.panier.updateMany({
          where: {
            id: id,
          },
          data: {
            qte: qte,
          },
        });
        res.status(200).json({
          status: true,
          msg: "Mis a jour du Panier ${id}",
        });
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  deleteProduit: any = async (req: any, res: Response) => {
    const data = await req.param;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      try {
        const { id } = data;
        const panier = await this.prisma.panier.deleteMany({
          where: {
            id: id,
          },
        });

        res.status(200).json({
          status: true,
          msg: `supression du Panier ${id}`,
        });
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  getPaniers: any = async (req: any, res: Response) => {
    try {
      const panier = await this.prisma.panier.findMany({
        select: {
          id: true,
          pid: true,
          uid: true,
          qte: true,
          createdAt: true,
        },
      });

      res.status(200).json({
        status: true,
        data: panier,
      });
    } catch (error) {
      console.error("Erreur lors de la requête à la base de données:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
}
