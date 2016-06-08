// #docregion
import { Component } from '@angular/core';
import { upgradeAdapter } from './upgrade_adapter';

const HeroDetail = upgradeAdapter.upgradeNg1Component('heroDetail');

@Component({
  selector: 'my-container',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-detail></hero-detail>
  `,
  directives: [HeroDetail]
})
export class ContainerComponent {

}
