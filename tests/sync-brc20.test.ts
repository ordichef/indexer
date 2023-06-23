import supertest from "supertest";
import {
  syncBrc20DeployInscription,
  syncBrc20MintInscription,
  syncBrc20TransferInscription,
} from "../src/sync-brc20";
import { BRC20_OP, BRC_P } from "../src/types";
// import app from "../src/index";

// const request = supertest(app);

describe("test brc20 sync", () => {
  it("test sync deploy", async () => {
    expect(
      syncBrc20DeployInscription({
        p: BRC_P.BRC_20,
        op: BRC20_OP.DEPLOY,
        tick: "MXRC",
        max: "5500",
      })
    ).toBe(undefined);
  });
  it("test sync mint", async () => {
    expect(
      syncBrc20MintInscription({
        p: BRC_P.BRC_20,
        op: BRC20_OP.MINT,
        tick: "MXRC",
        amt: "5500",
      })
    ).toBe(undefined);
  });
  it("test sync transfer", async () => {
    expect(
      syncBrc20TransferInscription({
        p: BRC_P.BRC_20,
        op: BRC20_OP.TRANSFER,
        tick: "MXRC",
        amt: "5500",
      })
    ).toBe(undefined);
  });

  // it('test sync deploy', async () => {
  //   const res = await
  //     request.get("/")
  //       .set('Accept', 'application/json');

  //   expect(res.status).toBe(200);
  //   const sync = syncBrc20Inscription({ p: 'brc-20', op: 'deploy', tick: 'MXRC', amt: '5500' });
  //   expect(sync).toBe(undefined);
  // });
});
