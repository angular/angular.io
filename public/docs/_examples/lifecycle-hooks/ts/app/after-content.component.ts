// #docplaster
// #docregion
import {Component,  AfterContentChecked, AfterContentInit, ContentChild} from 'angular2/core';

import {LoggerService}  from './logger.service';

//////////////////
@Component({
  selector: 'my-child',
  template: '<input [(ngModel)]="hero">'
})
export class ChildComponent {
  hero = 'Magneta';
}

//////////////////////
@Component({
  selector: 'after-content',
// #docregion template
  template:`
    <div>-- projected content begins --</div>
      <ng-content></ng-content>
    <div>-- projected content ends --</div>`
// #enddocregion template
   + `
    <p *ngIf="comment" class="comment">
      {{comment}}
    </p>
  `
})
// #docregion hooks
export class AfterContentComponent implements  AfterContentChecked, AfterContentInit {
  private _prevHero = '';

  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent) contentChild: ChildComponent;

// #enddocregion hooks
  constructor(private _logger:LoggerService){
    this._logIt('AfterContent constructor');
  }

// #docregion hooks
  ngAfterContentInit() {
    // viewChild is set after the view has been initialized
    this._logIt('AfterContentInit');
    this._doSomething();
  }

  ngAfterContentChecked() {
    // viewChild is updated after the view has been checked
    if (this._prevHero === this.contentChild.hero) {
      this._logIt('AfterContentChecked (no change)');
    } else {
      this._prevHero = this.contentChild.hero;
      this._logIt('AfterContentChecked');
      this._doSomething();
    }
  }
// #enddocregion hooks

  comment = '';

// #docregion do-something

  // This surrogate for real business logic sets the `comment`
  private _doSomething() {
    this.comment = this.contentChild.hero.length > 10 ? "That's a long name" : '';
  }

  private _logIt(method:string){
    let vc = this.contentChild;
    let message = `${method}: ${vc ? vc.hero:'no'} child view`
    this._logger.log(message);
  }
// #docregion hooks
  // ...
}
// #enddocregion hooks

//////////////
@Component({
  selector: 'after-content-parent',
  template: `
  <div class="parent">
    <h2>AfterContent</h2>

    <div   *ngIf="show">` +
// #docregion parent-template
     `<after-content>
        <my-child></my-child>
      </after-content>`
// #enddocregion parent-template
+ `</div>

    <h4>-- AfterContent Logs --</h4>
    <p><button (click)="reset()">Reset</button></p>
    <div *ngFor="#msg of logs">{{msg}}</div>
  </div>
  `,
  styles: ['.parent {background: burlywood}'],
  providers:[LoggerService],
  directives: [AfterContentComponent, ChildComponent]
})
export class AfterContentParentComponent {
  logs:string[];
  show = true;

  constructor(logger:LoggerService){
    this.logs = logger.logs;
  }

  reset() {
    this.logs.length=0;
    // quickly remove and reload AfterContentComponent which recreates it
    this.show = false;
    setTimeout(() => this.show = true, 0)
  }
}
