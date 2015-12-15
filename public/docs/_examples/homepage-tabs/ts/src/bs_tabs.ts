// #docregion
import {Component, Directive, Input, QueryList} from 'angular2/core';

@Directive({
  selector: '[bsPane]'
})
export class BsPane {
  @Input() title: string;
}

@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="var pane of panes"
          role="presentation" [class.active]="pane.active">
        <a href="javascript: false">{{pane.title}}</a>
      </li>
    </ul>`
})
export class BsTabs {
  //@ContentChildren(BsPane) panes: QueryList<Pane>;
}
