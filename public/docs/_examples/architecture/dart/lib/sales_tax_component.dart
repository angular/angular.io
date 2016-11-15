import 'package:angular2/core.dart';

import 'sales_tax_service.dart';
import 'tax_rate_service.dart';

@Component(
    selector: 'sales-tax',
    template: '''
      <h2>Sales Tax Calculator</h2>
      Amount: <input #amountBox (change)="0">

      <div *ngIf="amountBox.value != ''">
      The sales tax is
       {{ getTax(amountBox.value) | currency:'USD':true:'1.2-2' }}
      </div>
    ''',
    providers: const [SalesTaxService, TaxRateService])
class SalesTaxComponent {
  SalesTaxService _salesTaxService;

  SalesTaxComponent(this._salesTaxService) {}

  num getTax(dynamic /* String | num */ value) =>
      this._salesTaxService.getVAT(value);
}
