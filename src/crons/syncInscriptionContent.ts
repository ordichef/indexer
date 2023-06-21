// sync ordinals
import axios from "axios";
import { dbInstance } from "../core/database";
import { Inscription } from "../models/inscription.model";
import { CronRunner } from "../core/cron/cronRunner";
import { CronJob } from "cron";
import { Transaction, Op } from "sequelize";

const CRON_NAME="SYNC_INSCRIPTION_CONTENT";
const MAX_CONTENT_LENGTH=520;
const MIME_TYPE="text/plain";
const LIMIT=100;


function isJson(item) {
  let value = typeof item !== "string" ? JSON.stringify(item) : item;    
  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }
    
  return typeof value === "object" && value !== null;
}


const syncInscriptionContent = async () => {
  let transaction: Transaction | undefined;
  try {
    console.log(" --------------syncInscriptionContent------------  ")
    const inscriptions = await Inscription.findAll({
      where: {
        mime_type: MIME_TYPE,
        content_length: {
          [Op.lte]: MAX_CONTENT_LENGTH
        },
        content: {
          [Op.eq]: null
        }
      },
      limit: LIMIT,
      order: [['number', 'ASC']]
    })

    for (const inscription of inscriptions) {
      const resp = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions/${inscription["id"]}/content`)
      // console.log(resp.data);

      if(isJson(resp.data)){
        inscription['is_json'] = true;
        const jsonObj = JSON.parse(resp.data);
        console.log(jsonObj);

        if(jsonObj["p"]){
          inscription['brc_p'] = jsonObj["p"];
        }
        if(jsonObj["op"]){
          inscription['brc_op'] = jsonObj["op"];
        }
      }else{
        inscription['is_json'] = false;
      }
      inscription['content'] = resp.data;
      
      console.log(`UPDATING ${inscription['id']}`)
      await inscription.save();
    }

  } catch (error) {
    console.error(error);
    if(transaction) transaction.rollback();
    throw error;
  }
}

const startSyncInscriptionContent = () => {
  const cronRunner = new CronRunner(CRON_NAME, false, syncInscriptionContent); 
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
  startSyncInscriptionContent
}
