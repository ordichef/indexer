import Joi from '@hapi/joi';

export const brc30Validator = Joi.object({
  p: Joi.string().valid('brc-20').required(),
  op: Joi.string().valid('transfer', 'deploy', 'mint').required(),
  tick: Joi.string().length(4).required(),
  amt: Joi.string().pattern(/^[0-9]+$/).required(),
});
