import http from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import config from './core/config';
import { initRoute } from './routes/route';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://onchainbean.com','http://localhost:*', 'http://localhost:5173', 'http://localhost:5174' ],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use('/uploads', express.static('uploads'));

initRoute(app);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
})
