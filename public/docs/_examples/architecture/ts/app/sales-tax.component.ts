// #docplaster
// #docregion
import {Component}       from 'angular2/core';
import {SalesTaxService} from './sales-tax.service';
import {TaxRateService}  from './tax-rate.service';

// #docregion metadata
// #docregion providers
@Component({
// #enddocregion providers
  selector:    'sales-tax',
  template: `
    <h2>Sales Tax Calculator</h2>
    Amount: <input #amountBox (change)="0">
    
    <div *ngIf="amountBox.value">
    The sales tax is
     {{ getTax(amountBox.value) | currency:'USD':true:'1.2-2' }}
    </div>
  `,
// #docregion providers
  providers:   [SalesTaxService, TaxRateService]
})
// #enddocregion providers
// #enddocregion metadata
/*
// #docregion metadata, providers
export class SalesTaxComponent { ... }
// #enddocregion metadata, providers
*/
// #docregion class
export class SalesTaxComponent {
// #docregion ctor
  constructor(private _salesTaxService: SalesTaxService) { }
// #enddocregion ctor

  getTax(value:string | number){
    return this._salesTaxService.getVAT(value);
  }
}
// #enddocregion class
