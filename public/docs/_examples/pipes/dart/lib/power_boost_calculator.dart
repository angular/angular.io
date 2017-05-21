library pipe_examples.power_boost_calculator;

import 'package:angular2/angular2.dart';
import 'package:pipe_examples/exponential_strength_pipe.dart';

@Component(selector: 'power-boost-calculator')
@View(
    template: '''
<h2>Power Boost Calculator</h2>
<div>Normal power: <input [(ng-model)]="power"></div>
<div>Boost factor: <input [(ng-model)]="factor"></div>
<p>
  Super Hero Power: {{power | exponentialStrength: factor}}
</p>
''',
    pipes: const [ExponentialStrengthPipe],
    directives: const [FORM_DIRECTIVES])
class PowerBoostCalculator {
  int power = 5;
  int factor = 1;
}
