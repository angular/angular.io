// #docregion
import {Injectable, Inject}     from 'angular2/core';
import {TaxRateService} from './tax-rate.service';

// #docregion class
@Injectable()
export class SalesTaxService {
  constructor(private _rateService: TaxRateService) { }
  getVAT(value:string | number){
    let amount:number;
    if (typeof value === "string"){
      amount = parseFloat(value);
    } else {
      amount = value;
    }
    return (amount || 0) * this._rateService.getRate('VAT');
  }
}
// #enddocregion class