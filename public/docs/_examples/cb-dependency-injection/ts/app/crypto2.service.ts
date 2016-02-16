// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class Crypto2Service {
  encode(original: string) {
    return `@${original.split("").reverse().join("")}@`;
  }
}
// #enddocregion