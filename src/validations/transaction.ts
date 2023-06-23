import Joi from "@hapi/joi";

export const transactionCommon = Joi.object({
  id: Joi.string().required(),
  address: Joi.string().required(),
}).unknown(true);
