// #docregion
import {Component} from 'angular2/core';
import {BsTabs, BsPane} from './bs_tabs';

@Component({
  selector: 'di-demo',
  template: `
    Demo:
    <bs-tabs>
      <div *bsPane="title: 'Summary'">
        summary text ...
      </div>
    </bs-tabs>`,
    directives: [BsTabs, BsPane]
})
export class DiDemo {
}
