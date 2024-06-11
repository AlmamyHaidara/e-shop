import express from "express";
import CommandeController from "../controllers/CommandeController";
import { verifyToken } from "../middleware/middleware";

// Initialisation des import
const router = express.Router();
const commande = new CommandeController();

// Routes pour les commandes

// Récupérer toutes les commandes
router.get("/commandes", verifyToken, commande.getCommandes);

// Créer une nouvelle commande
router.post("/commandes", verifyToken, commande.createCommande);

// Mettre à jour une commande existante
router.put("/commandes/:id", verifyToken, commande.updateCommande);

// Supprimer une commande
router.delete("/commandes/:id", verifyToken, commande.deleteCommande);

export { router as commandeRoute };
