import express, { Response } from "express";
import { userRoute } from "./routers/user.routes";
import { produitRouter } from "./routers/produit.routes";
import { panierRoute } from "./routers/panier.routes";
const app = express();

app.use(express.json());
app.use(userRoute);
app.use(produitRouter);
app.use(panierRoute);

app.get("/", (req: any, res: Response) => {
  res.json({
    msg: "Hello",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
