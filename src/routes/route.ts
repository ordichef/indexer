import express, { Request, Response } from "express";
import uploadMiddleware from "../middlewares/multer";
import Brc20Transaction from "./brc20Transaction.route";
import InscriptionRouter from "./inscription.route";
import FileRouter from "./file.route";

let minted = 0;
let total = 111;

const initRoute = (app: express.Express) => {
  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
      message: "Hello World",
    });
  });

  app.post("/checkWL", async (req: Request, res: Response) => {
    res.status(200).json({
      data: {
        message: "Not in whitelist",
      },
    });
  });

  app.get("/minted", async (req: Request, res: Response) => {
    res.status(200).json({
      data: {
        minted: minted,
        total: total,
      },
    });
  });

  app.post(
    "/JDpHBCSxhRfD3yhOlL5u/minted",
    async (req: Request, res: Response) => {
      minted = req.body.minted;
      total = req.body.total;

      res.status(200).json({
        data: {
          message: "success",
        },
      });
    }
  );

  app.use("/inscription", InscriptionRouter);
  app.use("/transaction", Brc20Transaction);
  app.use("/uploads", FileRouter);
};

export { initRoute };
