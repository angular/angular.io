// #docplaster
library displaying_data.app_component_1;
/*
// #docregion fixed-lib
library displaying_data.app_component;
// #enddocregion fixed-lib
*/
// #docregion fixed-lib

import 'package:angular2/angular2.dart';

@Component(
    selector: 'my-app',
// #docregion template
    template: '''
<h1>{{title}}</h1>
<h2>My favorite hero is: {{myHero}}</h2>'''
// #enddocregion template
    )
class AppComponent {
  String title = 'Tour of Heroes';
  String myHero = 'Windstorm';
}
// #enddocregion fixed-lib