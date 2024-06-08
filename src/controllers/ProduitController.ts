import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export default class ProduitController {
  prisma = new PrismaClient();

  createProduit: any = async (req: any, res: Response) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
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
            .json({ status: false, msg: "cet produit existe deja" });
        } else {
          const produit = await this.prisma.produit.create({
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
            msg: "produit creer avec succes",
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

  updateProduit: any = async (req: any, res: Response) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      try {
        const { id, nom, categorie, prix, photo, description } = data;
        const produit = await this.prisma.produit.findMany({
          where: {
            nom: nom,
          },
        });
        if (produit) {
          const produit = await this.prisma.produit.update({
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
            msg: "Produit modifier avec succes",
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Cet produit n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  findProduit: any = async (req: any, res: Response) => {
    const data = await req.param;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
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
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  getProduits: any = async (req: any, res: Response) => {
    try {
      const produit = this.prisma.produit.findMany({
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
        data: produit,
      });
    } catch (error) {
      console.error("Erreur lors de la requête à la base de données:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  deleteProduct: any = async (req: any, res: Response) => {
    const data = await req.param;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donner reçue" });
    } else {
      const { id } = data;
      this.prisma.produit.delete({
        where: {
          id: id,
        },
      });

      res
        .status(200)
        .json({ status: true, msg: "Produit suprimer avec succes" });
    }
  };
}
