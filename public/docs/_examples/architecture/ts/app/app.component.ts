// #docregion import
import {Component} from 'angular2/core';
// #enddocregion import
import {HeroListComponent} from './hero-list.component';
import {SalesTaxComponent} from './sales-tax.component';

@Component({
  selector: 'my-app',
  template: `
  <hero-list></hero-list>
  <sales-tax></sales-tax>
  `,
  directives: [HeroListComponent, SalesTaxComponent]
})
// #docregion export
export class AppComponent { }
// #enddocregion export