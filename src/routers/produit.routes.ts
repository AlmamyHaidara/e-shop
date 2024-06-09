import express from "express";
import ProduitController from "../controllers/ProduitController";
import { verifyToken } from "../middelware/middleware";

// Initialisation des import
const router = express.Router();
const produit = new ProduitController();

// Get

router.get("/find-produit/:element", verifyToken, produit.findProduit);
router.get("/get-produits/", verifyToken, produit.getProduits);

// Delete

router.get("/delete-produits/:id", verifyToken, produit.deleteProduct);

// Post

router.post("/create-produit/", verifyToken, produit.createProduit);

//Put

router.put("/update-produit/", verifyToken, produit.updateProduit);
export { router as produitRouter };
