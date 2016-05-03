// #docregion
import { Inject, Injectable }     from '@angular/core';

import { TaxRateService } from './tax-rate.service';

// #docregion class
@Injectable()
export class SalesTaxService {
  constructor(private rateService: TaxRateService) { }
  getVAT(value:string | number){
    let amount:number;
    if (typeof value === "string"){
      amount = parseFloat(value);
    } else {
      amount = value;
    }
    return (amount || 0) * this.rateService.getRate('VAT');
  }
}
// #enddocregion class
