// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class DateLoggerService{
  logInfo(msg:string){
    console.log(new Date().toString() + ` INFO: ${msg}`);
  }
}