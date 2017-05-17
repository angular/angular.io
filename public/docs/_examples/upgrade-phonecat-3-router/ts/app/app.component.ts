// #docplaster
// #docregion bare, with-bootstrap
import { Component, OnInit } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'phonecat-app',
  template: `
    <router-outlet></router-outlet>
    <div class="view-container">
      <div ng-view class="view-frame"></div>
    </div>
  `
})
export class AppComponent implements OnInit {
// #enddocregion bare
  constructor(private upgrade: UpgradeModule) {}
// #docregion bare
  ngOnInit() {
// #enddocregion bare
    this.upgrade.bootstrap(document.documentElement.querySelector('[ng-view]'), ['phonecatApp']);
// #docregion bare
  }
}
