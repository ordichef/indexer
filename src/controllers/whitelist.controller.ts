import { Request, Response } from "express";
import fs from "fs";

const checkWhitelist = async (req: Request, res: Response) => {
  const id = req.params.id;
  const whitelistOG = fs
    .readFileSync("src/resources/whitelist_golden.txt", { encoding: "utf8" })
    .split("\n");
  const whitelistGolden = fs
    .readFileSync("src/resources/whitelist_golden.txt", { encoding: "utf8" })
    .split("\n");
  const whitelistGreen = fs
    .readFileSync("src/resources/whitelist_green.txt", { encoding: "utf8" })
    .split("\n");

  switch (true) {
    case whitelistOG.includes(id): {
      return {
        type: "OG List",
      };
    }

    case whitelistGolden.includes(id): {
      return {
        type: "Golden Beanlist",
      };
    }

    case whitelistGreen.includes(id): {
      return {
        type: "Green Beanlist",
      };
    }

    default:
      return {
        type: null,
      };
  }
};

export { checkWhitelist };
