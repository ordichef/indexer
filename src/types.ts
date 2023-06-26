export enum BRC_P {
  BRC_20 = "brc-20",
}

export enum BRC20_OP {
  TRANSFER = "transfer",
  DEPLOY = "deploy",
  MINT = "mint",
}

export const BRC20_DEC_DEFAULT = 18;

export type BRC20 = {
  p: BRC_P.BRC_20;
  op: BRC20_OP.DEPLOY | BRC20_OP.MINT | BRC20_OP.TRANSFER;
  tick: string;

  max?: string;
  lim?: string;
  dec?: string;
  amt?: string;
};
