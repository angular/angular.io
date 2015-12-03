// #docregion
library template_syntax.loop_back_component;

import 'package:angular2/angular2.dart';

@Component(selector: 'loop-back')
@View(template: '''<input #box (keyup)="0"> <p>{{box.value}}</p>''')
class LoopBackComponent {}
// #enddocregion
