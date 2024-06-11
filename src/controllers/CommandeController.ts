import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export default class CommandeController {
  prisma = new PrismaClient();

  createCommande: any = async (req: any, res: Response) => {
    const { uid, produits } = req.body; // produits est un tableau de { produitId, quantite, prix }

    if (!produits || produits.length === 0) {
      res.status(404).json({ status: false, message: "Aucun produit spécifié" });
    } else {
      try {
        const commande = await this.prisma.commande.create({
          data: {
            uid,
            total: produits.reduce((acc: number, curr: { prix: number; quantite: number; }) => acc + curr.prix * curr.quantite, 0).toString(),
            status: 'En cours',
            DetailsCommandes: {
              create: produits.map((p: { produitId: any; quantite: any; prix: any; }) => ({
                produitId: p.produitId,
                quantite: p.quantite,
                prix: p.prix
              }))
            }
          },
          include: {
            DetailsCommandes: true
          }
        });

        res.status(201).json({
          status: true,
          message: "Commande créée avec succès",
          data: commande
        });
      } catch (error) {
        console.error("Erreur lors de la création de la commande:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  updateCommande: any = async (req: any, res: Response) => {
    const { commandeId, status } = req.body;

    try {
      const updatedCommande = await this.prisma.commande.update({
        where: { id: commandeId },
        data: { status },
      });

      res.status(200).json({
        status: true,
        message: `Commande ${commandeId} mise à jour`,
        data: updatedCommande
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  deleteCommande: any = async (req: any, res: Response) => {
    const { commandeId } = req.params;

    try {
      await this.prisma.commande.delete({
        where: { id: commandeId },
      });

      res.status(200).json({
        status: true,
        message: `Commande ${commandeId} supprimée`
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  getCommandes: any = async (req: any, res: Response) => {
    try {
      const commandes = await this.prisma.commande.findMany({
        include: {
          DetailsCommandes: true,
          user: true
        }
      });

      res.status(200).json({
        status: true,
        data: commandes
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
}