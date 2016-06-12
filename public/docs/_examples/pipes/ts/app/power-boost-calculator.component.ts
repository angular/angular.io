// #docregion
import { Component } from '@angular/core';

import { ExponentialStrengthPipe } from './exponential-strength.pipe';

@Component({
  selector: 'power-boost-calculator',
  template: `
    <h2>Power Boost Calculator</h2>
    <div>Normal power: <input [(ngModel)]="power"></div>
    <div>Boost factor: <input [(ngModel)]="factor"></div>
    <p>
      Super Hero Power: {{power | exponentialStrength: factor}}
    </p>
  `,
  pipes: [ExponentialStrengthPipe]
})
export class PowerBoostCalculatorComponent {
  power = 5;
  factor = 1;
}
