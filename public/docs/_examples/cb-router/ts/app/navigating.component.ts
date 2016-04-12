// #docregion
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'navigating',
  template: `
    <h3 *ngIf="router.navigating">LOADING</h3>
    `
})
export class NavigatingComponent {
  constructor(public router: Router) {}
}
