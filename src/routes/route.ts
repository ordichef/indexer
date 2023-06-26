import express, { Request, Response } from "express";
import Brc20Transaction from "./brc20Transaction.route";
import InscriptionRouter from "./inscription.route";

const initRoute = (app: express.Express) => {
  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
      message: "Hello World",
    });
  });

  app.use("/inscription", InscriptionRouter);
  app.use("/transaction", Brc20Transaction);
};

export { initRoute };
