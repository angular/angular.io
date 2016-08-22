// #docregion
import 'package:angular2/angular2.dart';
import 'exponential_strength_pipe.dart';

@Component(
    selector: 'power-boost-calculator',
    template: '''
      <h2>Power Boost Calculator</h2>
      <div>Normal power: <input type="number" [(ngModel)]="power"/></div>
      <div>Boost factor: <input type="number" [(ngModel)]="factor"/></div>
      <p>
        Super Hero Power: {{power | exponentialStrength: factor}}
      </p>
    ''',
    pipes: const [ExponentialStrengthPipe])
class PowerBoostCalculatorComponent {
  num power = 5;
  num factor = 1;
}
