// sync ordinals
import axios from "axios";
import { dbInstance } from "../core/database";
import { Inscription } from "../models/inscription.model";
import { CronRunner } from "../core/cron/cronRunner";
import { CronJob } from "cron";
import { Transaction } from "sequelize";

const BATCH_SYNC=20;
const CRON_NAME="SYNC_INSCRIPTION";

const syncInscription = async () => {
  let transaction: Transaction | undefined;
  try {
    console.log(" --------------syncInscription------------  ")
    let maxNumber: number =  await Inscription.max("number");
    if(!maxNumber){
      maxNumber = 0;
    }
    console.log(maxNumber);

    const resp = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions?from_number=${maxNumber+1}&to_number=${maxNumber+BATCH_SYNC}`)
    const results = resp.data.results;
  
    transaction = await dbInstance.transaction();
    console.log("size - "+results.length);
    if(results.length > 0){
      await Inscription.bulkCreate(results, {
        transaction
      })
      await transaction.commit();
      await syncInscription();
    }


  } catch (error) {
    console.error(error);
    if(transaction) transaction.rollback();
    // throw error;
  }
}

const startSyncInscription = () => {
  const cronRunner = new CronRunner(CRON_NAME, false, syncInscription); 
  const job = new CronJob(
    '* * * * * *',
    cronRunner.run,
    null,
    true,
    'Etc/UTC'
  );
  job.start()
}


export {
  startSyncInscription
}
