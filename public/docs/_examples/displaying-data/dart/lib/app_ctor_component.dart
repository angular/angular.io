// #docregion
library displaying_data.app_ctor_component;

import 'package:angular2/angular2.dart';

@Component(
    selector: 'my-app-ctor',
    template: '''
<h1>{{title}} [Ctor version]</h1>
<h2>My favorite hero is: {{myHero}}</h2>''')
// #docregion app-ctor
class AppCtorComponent {
  String title;
  String myHero;

  AppCtorComponent() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
}
// #enddocregion app-ctor
