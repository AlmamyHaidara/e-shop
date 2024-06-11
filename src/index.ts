import express, { Response } from "express";
import { userRoute } from "./routers/user.routes";
import { produitRouter } from "./routers/produit.routes";
import { commandeRoute } from "./routers/commande.routes";
import { detailsCommandeRoute } from "./routers/detailscommande.routes";
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());
app.use(userRoute);
app.use(produitRouter);
app.use(commandeRoute);
app.use(detailsCommandeRoute);

app.get("/", (req: any, res: Response) => {
  res.json({
    msg: "Hello",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
