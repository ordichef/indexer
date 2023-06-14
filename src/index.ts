import http from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import config from './core/config';
import { Inscription } from './models/inscription.model';
import { initRoute } from './routes/route';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initRoute(app);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
})
