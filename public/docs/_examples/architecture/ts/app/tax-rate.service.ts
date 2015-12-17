// #docregion
import {Injectable} from 'angular2/core';

// #docregion class
@Injectable()
export class TaxRateService {
  getRate(rateName:string){return 0.10;} // always 10% everywhere
}
// #enddocregion class