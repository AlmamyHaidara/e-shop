import { PrismaClient } from "@prisma/client";
import { Response } from "express";

export default class DetailsCommandeController {
  prisma = new PrismaClient();

  // Ajouter des détails à une commande
  addDetailsCommande: any = async (req: any, res: Response) => {
    const { commandeId, produitId, quantite, prix } = req.body;

    try {
      const detail = await this.prisma.detailsCommande.create({
        data: {
          commandeId,
          produitId,
          quantite,
          prix
        }
      });

      res.status(201).json({
        status: true,
        message: "Détail de commande ajouté avec succès",
        data: detail
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du détail de la commande:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  // Mettre à jour les détails d'une commande
  updateDetailsCommande: any = async (req: any, res: Response) => {
    const { id, quantite, prix } = req.body;

    try {
      const detail = await this.prisma.detailsCommande.update({
        where: { id },
        data: { quantite, prix }
      });

      res.status(200).json({
        status: true,
        message: "Détail de commande mis à jour avec succès",
        data: detail
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du détail de la commande:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  // Supprimer les détails d'une commande
  deleteDetailsCommande: any = async (req: any, res: Response) => {
    const { id } = req.params;

    try {
      await this.prisma.detailsCommande.delete({
        where: { id }
      });

      res.status(200).json({
        status: true,
        message: "Détail de commande supprimé avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du détail de la commande:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  // Récupérer tous les détails d'une commande spécifique
  getDetailsCommande: any = async (req: any, res: Response) => {
    const { commandeId } = req.params;

    try {
      const details = await this.prisma.detailsCommande.findMany({
        where: { commandeId }
      });

      res.status(200).json({
        status: true,
        data: details
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la commande:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
}