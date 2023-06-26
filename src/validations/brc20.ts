import Joi from "@hapi/joi";
import { BRC20_OP } from "../types";

const brc20CommoneSchema = {
  p: Joi.string().valid("brc-20").required(),
  op: Joi.string()
    .valid(BRC20_OP.DEPLOY, BRC20_OP.MINT, BRC20_OP.TRANSFER)
    .required(),
  tick: Joi.string().length(4).required(),
};

export const brc20ValidatorCommon = Joi.object({
  ...brc20CommoneSchema,
}).unknown(true);

export const brc20ValidatorDeploy = Joi.object({
  ...brc20CommoneSchema,
  op: Joi.string().valid(BRC20_OP.DEPLOY).required(),
  max: Joi.string()
    .required()
    .pattern(/^[0-9]+$/),
  lim: Joi.string().pattern(/^[0-9]+$/),
  dec: Joi.string()
    .pattern(/^[0-9]+$/)
    .default("18"),
}).unknown(true);

export const brc20ValidatorMint = Joi.object({
  ...brc20CommoneSchema,
  op: Joi.string().valid(BRC20_OP.MINT).required(),
  amt: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
}).unknown(true);

export const brc20ValidatorTransfer = Joi.object({
  ...brc20CommoneSchema,
  op: Joi.string().valid(BRC20_OP.TRANSFER).required(),
  amt: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
}).unknown(true);
