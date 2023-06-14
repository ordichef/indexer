import { Request } from "express";
import { Inscription } from "../models/inscription.model"


const getAll = async (req: Request) => {
  return await Inscription.findAll();
}


export {
  getAll
}
