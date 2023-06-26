import { Op } from "sequelize";
import { Brc20Transaction } from "../models/brc20Transaction.model";
import { Inscription } from "../models/inscription.model";
import { BRC20_OP, BRC_P } from "../types";
import { createTransaction } from "../controllers/brc20Transaction.controller";
import { CronRunner } from "../core/cron/cronRunner";
import { CronJob } from "cron";

const BATCH_SYNC = 100;
const CRON_NAME = "SYNC_TRANSACTION";
const MAX_CONTENT_LENGTH = 520;
const MIME_TYPE = "text/plain";

const syncTransaction = async () => {
  try {
    const lastTransaction = await Brc20Transaction.findOne({
      order: [["createdAt", "DESC"]],
    });

    let currentNumberInscription = 0;

    if (lastTransaction) {
      const lastInscription = await Inscription.findByPk(
        lastTransaction.dataValues.id
      );

      if (lastInscription) {
        currentNumberInscription = lastInscription.dataValues.number;
      }
    }

    while (true) {
      const inscriptions = await Inscription.findAll({
        where: {
          mime_type: MIME_TYPE,
          content_length: {
            [Op.lte]: MAX_CONTENT_LENGTH,
          },
          brc_p: BRC_P.BRC_20,
          brc_op: {
            [Op.in]: [BRC20_OP.TRANSFER, BRC20_OP.MINT, BRC20_OP.DEPLOY],
          },
          number: {
            [Op.gt]: currentNumberInscription,
          },
          is_json: true,
        },
        limit: BATCH_SYNC,
        order: [["number", "ASC"]],
      });

      if (inscriptions.length) {
        for await (const inscription of inscriptions) {
          try {
            currentNumberInscription = inscription.dataValues.number;

            await createTransaction(inscription.dataValues);
            console.log(`Transition ${inscription["id"]} created`);
          } catch (error) {
            // console.error(
            //   "🚀 ~ file: syncInscriptionTransfer.ts:63 ~ forawait ~ error:",
            //   error
            // );
          }
        }
      }
    }
  } catch (error) {
    // console.error(error);
    // throw error;
  }
};

const startSyncTransaction = () => {
  const cronRunner = new CronRunner(CRON_NAME, false, syncTransaction);
  const job = new CronJob("* * * * * *", cronRunner.run, null, true, "Etc/UTC");
  job.start();
};

export { startSyncTransaction };
