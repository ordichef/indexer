
const running = {};

const start = (taskName: string) => {
  if(isRunning(taskName)) return false;
  running[taskName] = true
  console.log("start "+taskName); 
  return true;
}

const end = (taskName: string) => {
  running[taskName] = false
}

const isRunning = (taskName: string) => {
  return running[taskName];
}

export const cronState =  {
  start, end, isRunning
}
