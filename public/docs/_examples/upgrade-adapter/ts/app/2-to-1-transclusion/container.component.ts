// #docregion
import {Component} from 'angular2/core';
import {upgradeAdapter} from './upgrade_adapter';
import {Hero} from '../Hero';

const HeroDetail = upgradeAdapter.upgradeNg1Component('heroDetail');

@Component({
  selector: 'my-container',
  template: `
    <hero-detail [hero]="hero">
      <!-- Everything here will get transcluded -->
      <p>{{hero.description}}</p>
    </hero-detail>
  `,
  directives: [HeroDetail]
})
export class ContainerComponent {
  hero = new Hero(1, 'Windstorm', 'Specific powers of controlling winds');
}
