import express from "express";
import ProduitController from "../controllers/ProduitController";
import { verifyToken } from "../middleware/middleware";

const router = express.Router();
const produit = new ProduitController();

// Routes pour les produits

// Rechercher un produit par un critère spécifique (par exemple, nom, catégorie)
router.get("/produits/:element", verifyToken, produit.findProduit);

// Récupérer tous les produits
router.get("/produits", verifyToken, produit.getProduits);

// Créer un nouveau produit
router.post("/produits", verifyToken, produit.createProduit);

// Mettre à jour un produit existant
router.put("/produits/:id", verifyToken, produit.updateProduit);

// Supprimer un produit
router.delete("/produits/:id", verifyToken, produit.deleteProduct);

export { router as produitRouter };