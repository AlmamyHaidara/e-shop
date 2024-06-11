import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export default class ProduitController {
  prisma = new PrismaClient();

  createProduit: any = async (req: any, res: Response) => {
    const data = req.body;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      try {
        const { nom, categorie, prix, photo, description } = data;
        const produit = await this.prisma.produit.findMany({
          where: {
            nom: nom,
          },
        });
        if (produit.length > 0) {
          res
            .status(200)
            .json({ status: false, msg: "Ce produit existe déjà" });
        } else {
          const newProduit = await this.prisma.produit.create({
            data: {
              nom,
              categorie,
              prix,
              photo,
              description,
            },
          });

          res.status(200).json({
            status: true,
            msg: "Produit créé avec succès",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };

  updateProduit: any = async (req: any, res: Response) => {
    const data = req.body;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      try {
        const { id, nom, categorie, prix, photo, description } = data;
        const produit = await this.prisma.produit.findMany({
          where: {
            nom: nom,
          },
        });
        if (produit.length > 0) {
          const updatedProduit = await this.prisma.produit.update({
            where: {
              id: id,
            },
            data: {
              nom: nom,
              prix: prix,
              categorie: categorie,
              photo: photo,
              description: description,
            },
          });

          res.status(200).json({
            status: true,
            msg: "Produit modifié avec succès",
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Ce produit n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };

  findProduit: any = async (req: any, res: Response) => {
    const data = req.param;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      try {
        const { element } = data;
        const produit = this.prisma.produit.findFirst({
          where: {
            id: element,
            OR: [
              {
                id: {
                  equals: element,
                },
                nom: {
                  equals: element,
                },
              },
            ],
          },
        });

        res.status(200).json({
          status: true,
          data: produit,
        });
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };

  getProduits: any = async (req: any, res: Response) => {
    try {
      const produits = await this.prisma.produit.findMany({
        select: {
          id: true,
          nom: true,
          prix: true,
          categorie: true,
          photo: true,
          description: true,
        },
      });

      res.status(200).json({
        status: true,
        data: produits,
      });
    } catch (error) {
      console.error("Erreur lors de la requête à la base de données:", error);
      res.status(500).json({ status: false, message: "Erreur interne du serveur" });
    }
  };

  deleteProduct: any = async (req: any, res: Response) => {
    const data = req.param;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      const { id } = data;
      this.prisma.produit.delete({
        where: {
          id: id,
        },
      });

      res
        .status(200)
        .json({ status: true, msg: "Produit supprimé avec succès" });
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };
}
