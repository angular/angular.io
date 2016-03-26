// #docregion
export class DateLoggerService{
  logInfo(msg:string){
    console.log(new Date().toString() + ` INFO: ${msg}`);
  }
}