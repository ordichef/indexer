import { syncBrc20Inscription } from "../src/sync-brc20";
import supertest from "supertest";
// import app from "../src/index";

// const request = supertest(app);

describe('test brc20 sync', () => {
  beforeEach(async () => {
    // await mongoose.connect('mongodb://127.0.0.1:27017/Heimdall_v4');
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    // await mongoose.connection.close();
  });
  it('test', async () => {
    expect(1).toBe(1);
  });

  it('test sync error', async () => {
    const sync = syncBrc20Inscription({ p: 'brc-20', op: 'transfer', tick: 'MXRC', amt: '5500x' });
    expect(sync).toBe(undefined);
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