import { CronCommand, CronJob } from "cron";
import { cronState } from "./cronState";


export class CronRunner {
  name: string;
  onTick: Function;
  concurrent: boolean;
  emptyCronCommand: Function = (): void => { 
    // console.log(`IGNORE - ${this.name} is Running`)
  };
  constructor(name: string, concurrent: boolean | false, onTick: Function) {
    this.name = name;
    this.concurrent = concurrent;
    this.onTick = onTick;
  }
  
  isRunning = () => {
    return cronState.isRunning(this.name);
  }


  run = async () => {
    // console.log(!this.concurrent && !cronState.start(this.name))
    if(!this.concurrent && !cronState.start(this.name)){
      return this.emptyCronCommand();
    }
    try {
      cronState.start(this.name);
      return await this.onTick()
    } catch (error) {
      console.error(error);
    }finally{
      cronState.end(this.name);
    }
  };

}
