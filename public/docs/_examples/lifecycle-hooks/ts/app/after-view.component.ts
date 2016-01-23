// #docplaster
// #docregion
import {Component,  AfterViewChecked, AfterViewInit, ViewChild} from 'angular2/core';

import {LoggerService}  from './logger.service';

//////////////////
// #docregion child-view
@Component({
  selector: 'my-child',
  template: '<input [(ngModel)]="hero">'
})
export class ChildViewComponent {
  hero = 'Magneta';
}
// #enddocregion child-view

//////////////////////
@Component({
  selector: 'after-view',
// #docregion template
  template: `
    <div>-- child view begins --</div>
      <my-child></my-child>
    <div>-- child view ends --</div>`
// #enddocregion template
   + `
    <p *ngIf="comment" class="comment">
      {{comment}}
    </p>
  `,

  directives: [ChildViewComponent]
})
// #docregion hooks
export class AfterViewComponent implements  AfterViewChecked, AfterViewInit {
  private _prevHero = '';

  // Query for a VIEW child of type `ChildViewComponent`
  @ViewChild(ChildViewComponent) viewChild: ChildViewComponent;

// #enddocregion hooks
  constructor(private _logger:LoggerService){
    this._logIt('AfterView constructor');
  }

// #docregion hooks
  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this._logIt('AfterViewInit');
    this._doSomething();
  }

  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    if (this._prevHero === this.viewChild.hero) {
      this._logIt('AfterViewChecked (no change)');
    } else {
      this._prevHero = this.viewChild.hero;
      this._logIt('AfterViewChecked');
      this._doSomething();
    }
  }
// #enddocregion hooks

  comment = '';

// #docregion do-something
  // This surrogate for real business logic sets the `comment`
  private _doSomething() {
    let c = this.viewChild.hero.length > 10 ? "That's a long name" : '';
    if (c !== this.comment) {
      // Wait a tick because the component's view has already been checked
      setTimeout(() => this.comment = c, 0);
    }
  }
// #enddocregion do-something

  private _logIt(method:string){
    let vc = this.viewChild;
    let message = `${method}: ${vc ? vc.hero:'no'} child view`
    this._logger.log(message);
  }
// #docregion hooks
  // ...
}
// #enddocregion hooks

//////////////
@Component({
  selector: 'after-view-parent',
  template: `
  <div class="parent">
    <h2>AfterView</h2>

    <after-view  *ngIf="show"></after-view>

    <h4>-- AfterView Logs --</h4>
    <p><button (click)="reset()">Reset</button></p>
    <div *ngFor="#msg of logs">{{msg}}</div>
  </div>
  `,
  styles: ['.parent {background: burlywood}'],
  providers:[LoggerService],
  directives: [AfterViewComponent]
})
export class AfterViewParentComponent {
  logs:string[];
  show = true;

  constructor(logger:LoggerService){
    this.logs = logger.logs;
  }

  reset() {
    this.logs.length=0;
    // quickly remove and reload AfterViewComponent which recreates it
    this.show = false;
    setTimeout(() => this.show = true, 0)
  }
}
