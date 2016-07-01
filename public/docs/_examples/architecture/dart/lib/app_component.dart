// #docregion import
import 'package:angular2/core.dart';
// #enddocregion import

import 'hero_list_component.dart';
import 'sales_tax_component.dart';

@Component(
    selector: 'my-app',
    template: '''
      <hero-list></hero-list>
      <sales-tax></sales-tax>''',
    directives: const [HeroListComponent, SalesTaxComponent])
// #docregion export
class AppComponent { }
