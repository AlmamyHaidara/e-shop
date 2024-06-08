import express from "express";
import ProduitController from "../controllers/ProduitController";

// Initialisation des import
const router = express.Router();
const produit = new ProduitController();

// Get

router.get("/find-produit/:element", produit.findProduit);
router.get("/get-produits/", produit.getProduits);

// Delete

router.get("/delete-produits/:id", produit.deleteProduct);

// Post

router.post("/create-produit/", produit.createProduit);

//Put

router.put("/update-produit/", produit.updateProduit);
export { router as userRoute };
