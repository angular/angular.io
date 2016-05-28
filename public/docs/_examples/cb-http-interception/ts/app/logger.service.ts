// #docregion
import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
  constructor() {
  }

  logs: string[] = [];

  log(message: string) {
    console.log(message);
    this.logs.push(message);
  }
}
