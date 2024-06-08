import express from "express";
import PanierController from "../controllers/PanierController";

// Initialisation des import
const router = express.Router();
const panier = new PanierController();

// Get

router.get("/get-paniers/", panier.getPaniers);

// Delete

router.get("/delete-panier/:id", panier.deleteProduit);

// Post

router.post("/create-panier/", panier.createPanier);

//Put

router.put("/update-panier/", panier.updatePanier);

export { router as userRoute };
