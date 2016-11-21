// #docregion
import { Component, Directive } from '@angular/core';

@Component({
  selector: 'content-projection-parent',
  template: `
    <div class="parent">
      <h2>Selective Content Projection and ngProjectAs usage</h2>
      <h3>Selective</h3>` +
// #docregion text-painter-usage
      `<text-painter>
        <span red-text>I am RED.</span>
        <span green-text>I am GREEN.</span>
      </text-painter>`
// #enddocregion text-painter-usage
  + `<h3>ngProjectAs</h3>` +
// #docregion super-text-painter-usage
    `<super-text-painter>
      <span red-text>I am RED.</span>
      <span blue-text>I am BLUE.</span>
      <span green-text>I am GREEN.</span>
    </super-text-painter>`
// #enddocregion super-text-painter-usage
    + `</div>
  `,
  styles: [`
    .parent {
      background: ivory;
    }
    :host >>> .box {
      border: 1px dotted gray;
      font-size: 1.2em;
      margin: 10px;
      padding: 5px;
      text-align: center;
    }
  `]
})
export class ContentProjectionParentComponent {

}

@Directive({
  selector: '[red-text]'
})
export class RedTextDirective { }

@Directive({
  selector: '[green-text]'
})
export class GreenTextDirective { }


@Component({
  selector: 'text-painter',
// #docregion text-painter-template
  template: `
  <div>
    <div class="box red-text">
      <ng-content select="[red-text]"></ng-content>
    </div>
    <div class="box green-text">
      <ng-content select="[green-text]"></ng-content>
    </div>
  </div>
  `,
// #enddocregion text-painter-template
  styles: [`
    .red-text {
      color: red;
    }
    .green-text {
      color: green;
    }
  `]
})
export class TextPainterComponent { }

@Directive({
  selector: '[blue-text]'
})
export class BlueTextDirective { }

@Component({
  selector: 'super-text-painter',
// #docregion super-text-painter-template
  template: `
  <div>
    <text-painter>
      <ng-content select="[red-text]" ngProjectAs="[red-text]"></ng-content>
      <ng-content select="[green-text]" ngProjectAs="[green-text]"></ng-content>
    </text-painter>
    <div class="box blue-text">
      <ng-content select="[blue-text]"></ng-content>
    </div>
  </div>
  `,
// #enddocregion super-text-painter-template
  styles: [`
    .blue-text {
      color: blue;
    }
  `]
})
export class SuperTextPainterComponent { }
