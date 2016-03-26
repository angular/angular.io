// #docregion
export class LoggerService{
  
  logInfo(msg:string){
    console.log(`INFO: ${msg}`);
  }
  
  logDebug(msg:string){
    console.log(`DEBUG: ${msg}`);
  }
  
  logError(msg:string){
    console.log(`ERROR: ${msg}`);
  }
}