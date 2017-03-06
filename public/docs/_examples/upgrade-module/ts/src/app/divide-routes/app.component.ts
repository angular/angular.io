// #docregion
import { Component, OnInit } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
    <div ng-view></div>
  `,
})
export class AppComponent implements OnInit {
  constructor(private upgrade: UpgradeModule) {}

  ngOnInit() {
    this.upgrade.bootstrap(document.body.querySelector('[ng-view]'), ['heroApp'], {strictDi: true});
  }
}
