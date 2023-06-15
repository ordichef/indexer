// sync brc20 from content of ordinals

import { BRC20 } from "./types";
import { brc20Validator } from "./validations/brc20";

export const syncBrc20Inscription = (content: BRC20) => {
  try {
    const validation = brc20Validator.validate(content);
    if (validation.error || validation.errors) {
      console.log('validation error');
      return;
    }

    
  } catch (error) {
    console.log(`error ${error}`);
  }
}