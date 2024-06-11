import express from "express";
import DetailsCommandeController from "../controllers/DetailsCommandeController";
import { verifyToken } from "../middleware/middleware";

const router = express.Router();
const detailsCommande = new DetailsCommandeController();

// Ajouter des détails à une commande
router.post("/details-commande", verifyToken, detailsCommande.addDetailsCommande);

// Mettre à jour les détails d'une commande
router.put("/details-commande/:id", verifyToken, detailsCommande.updateDetailsCommande);

// Supprimer les détails d'une commande
router.delete("/details-commande/:id", verifyToken, detailsCommande.deleteDetailsCommande);

// Récupérer tous les détails d'une commande spécifique
router.get("/details-commande/:commandeId", verifyToken, detailsCommande.getDetailsCommande);

export { router as detailsCommandeRoute };