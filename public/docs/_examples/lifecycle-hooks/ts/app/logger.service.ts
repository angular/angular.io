import {Injectable} from 'angular2/core';

@Injectable()
export class LoggerService {
  logs:string[] = [];

  log(msg:string, noTick:boolean = false)  {
    if (!noTick) { this.tick(); }
    this.logs.push(msg);
  }

  clear()   {this.logs.length = 0;}

  tick() {
    setTimeout(() => {
    // console.log('tick')
    }, 0);
  }
}
