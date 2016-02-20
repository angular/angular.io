// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class CryptoService {
  encode(original: string) {
    return `%${original}%`;
  }
}
// #enddocregion
