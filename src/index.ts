import http from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import * as config from './config';
import { Dog } from './models/dog';
import connection from "./database";

const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World'
  });
});

app.get("/dogs", async (req: Request, res: Response): Promise<Response> => {
  const allDogs: Dog[] = await Dog.findAll();
  return res.status(200).json(allDogs);
});

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();