import 'package:angular2/core.dart';

import 'tax_rate_service.dart';

@Injectable()
class SalesTaxService {
  TaxRateService rateService;

  SalesTaxService(this.rateService);

  num getVAT(dynamic /* String | num */ value) =>
      rateService.getRate('VAT') *
      (value is num ? value : num.parse(value, (_) => 0));
}
