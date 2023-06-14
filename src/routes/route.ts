
import InscriptionRouter from "./inscription.route"
import express, { Request, Response } from 'express';

const initRoute = (app: express.Express) => {
  app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Hello World'
    });
  });
  
  app.use('/inscription', InscriptionRouter);


}

export {
  initRoute
}