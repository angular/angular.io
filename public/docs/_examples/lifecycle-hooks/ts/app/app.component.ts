// #docregion
import {Component} from 'angular2/core';

import {AfterContentParentComponent} from './after-content.component';
import {AfterViewParentComponent} from './after-view.component';
import {CounterParentComponent} from './counter.component';
import {OnChangesParentComponent} from './on-changes.component';
import {PeekABooParentComponent} from './peek-a-boo-parent.component';
import {SpyParentComponent} from './spy.component';

/***************************************/
/*
  template: `
  <peek-a-boo-parent></peek-a-boo-parent>
  <on-changes-parent></on-changes-parent>
  <after-view-parent></after-view-parent>
  <after-content-parent></after-content-parent>
  <spy-parent></spy-parent>
  <counter-parent></counter-parent>
  `,
 */

@Component({
  selector: 'my-app',
  template: `
  <peek-a-boo-parent></peek-a-boo-parent>
  <on-changes-parent></on-changes-parent>
  <after-view-parent></after-view-parent>
  <after-content-parent></after-content-parent>
  <spy-parent></spy-parent>
  <counter-parent></counter-parent>
  `,
  directives: [
    AfterContentParentComponent,
    AfterViewParentComponent,
    OnChangesParentComponent,
    PeekABooParentComponent,
    SpyParentComponent,
    CounterParentComponent
  ]
})
export class AppComponent {
}
