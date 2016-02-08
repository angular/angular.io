// #docregion
import {Component} from 'angular2/core';
import {upgradeAdapter} from './upgrade_adapter';
import {Hero} from '../Hero';

const HeroDetail = upgradeAdapter.upgradeNg1Component('heroDetail');

@Component({
  selector: 'my-container',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-detail [hero]="hero"
                 (deleted)="heroDeleted($event)">
    </hero-detail>
  `,
  directives: [HeroDetail]
})
export class ContainerComponent {
  hero = new Hero(1, 'Windstorm');
  heroDeleted(event) {
    console.log(event);
  }
}
