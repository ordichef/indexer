import express, { Request, Response } from "express";
import Brc20Transaction from "./brc20Transaction.route";
import InscriptionRouter from "./inscription.route";

let minted = 0;

const initRoute = (app: express.Express) => {
  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
      message: "Hello World",
    });
  });

  app.post("/checkWL", async (req: Request, res: Response) => {
    res.status(200).json({
      data: {
        message: "Not in whitelist"
      },
    });
  });

  app.get("/minted", async (req: Request, res: Response) => {
    res.status(200).json({
      data: {
        minted: minted
      },
    });
  });

  app.post("/JDpHBCSxhRfD3yhOlL5u/minted", async (req: Request, res: Response) => {
    minted = req.body.minted
    res.status(200).json({
      data: {
        message: "success"
      },
    });
  });


  app.use("/inscription", InscriptionRouter);
  app.use("/transaction", Brc20Transaction);
};

export { initRoute };
