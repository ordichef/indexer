// sync ordinals
import axios from "axios";
import { dbInstance } from "../core/database";
import { Inscription } from "../models/inscription.model";
import { CronRunner } from "../core/cron/cronRunner";
import { CronJob } from "cron";
const BATCH_SYNC=20;
const CRON_NAME="SYNC_INSCRIPTION";

const syncInscription = async () => {
  try {
    console.log(" --------------syncInscription------------  ")
    let maxNumber: number =  await Inscription.max("number");
    if(!maxNumber){
      maxNumber = 0;
    }else{
      maxNumber++;
    }
    console.log(maxNumber);

    const resp = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions?from_number=${maxNumber}&to_number=${maxNumber+BATCH_SYNC-1}`)
    const results = resp.data.results;
  
    const transaction = await dbInstance.transaction();
    for (const item of results) {
      await Inscription.create(item, {
        transaction
      })
    }
    if(results.length > 0){
      await transaction.commit();
      await syncInscription();

    }

  } catch (error) {
    console.error(error);
    throw error;
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
