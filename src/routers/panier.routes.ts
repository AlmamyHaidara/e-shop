import express from "express";
import PanierController from "../controllers/PanierController";
import { verifyToken } from "../middelware/middleware";

// Initialisation des import
const router = express.Router();
const panier = new PanierController();

// Get

router.get("/get-paniers/", verifyToken, panier.getPaniers);

// Delete

router.get("/delete-panier/:id", verifyToken, panier.deleteProduit);

// Post

router.post("/create-panier/", verifyToken, panier.createPanier);

//Put

router.put("/update-panier/", verifyToken, panier.updatePanier);

export { router as panierRoute };
