// sync brc20 from content of ordinals

import { BRC20 } from "./types";
import {
  brc20ValidatorDeploy,
  brc20ValidatorMint,
  brc20ValidatorTransfer,
} from "./validations/brc20Content";

export const syncBrc20DeployInscription = (content: BRC20) => {
  try {
    const validation = brc20ValidatorDeploy.validate(content);
    if (validation.error || validation.errors) {
      console.log("validation error");
      return;
    }
  } catch (error) {
    console.log(`error ${error}`);
  }
};

export const syncBrc20MintInscription = (content: BRC20) => {
  try {
    const validation = brc20ValidatorMint.validate(content);
    if (validation.error || validation.errors) {
      console.log("validation error");
      return;
    }
  } catch (error) {
    console.log(`error ${error}`);
  }
};

export const syncBrc20TransferInscription = (content: BRC20) => {
  try {
    const validation = brc20ValidatorTransfer.validate(content);
    if (validation.error || validation.errors) {
      console.log("validation error");
      return;
    }
  } catch (error) {
    console.log(`error ${error}`);
  }
};
