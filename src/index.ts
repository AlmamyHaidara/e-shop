import express, { Response } from "express";
import { userRoute } from "./routers/user.routes";
import { produitRouter } from "./routers/produit.routes";
import { panierRoute } from "./routers/panier.routes";
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());
app.use(userRoute);
app.use(produitRouter);
app.use(panierRoute);

app.get("/", (req: any, res: Response) => {
  res.json({
    msg: "Hello",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
