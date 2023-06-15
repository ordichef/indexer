import Joi from '@hapi/joi';

export const brc20ValidatorDeploy = Joi.object({
  p: Joi.string().valid('brc-20').required(),
  op: Joi.string().valid('deploy').required(),
  tick: Joi.string().length(4).required(),
  amt: Joi.string().pattern(/^[0-9]+$/).required(),
});

export const brc20ValidatorMint = Joi.object({
  p: Joi.string().valid('brc-20').required(),
  op: Joi.string().valid('transfer', 'deploy', 'mint').required(),
  tick: Joi.string().length(4).required(),
  amt: Joi.string().pattern(/^[0-9]+$/).required(),
});

export const brc20ValidatorTransfer = Joi.object({
  p: Joi.string().valid('brc-20').required(),
  op: Joi.string().valid('transfer', 'deploy', 'mint').required(),
  tick: Joi.string().length(4).required(),
  amt: Joi.string().pattern(/^[0-9]+$/).required(),
});
