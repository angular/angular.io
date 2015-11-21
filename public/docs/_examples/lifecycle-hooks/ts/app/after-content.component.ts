// #docregion
import {
  Component, Input, Output,
  AfterContentChecked, AfterContentInit, ContentChild,
  AfterViewInit, ViewChild
} from 'angular2/core';

import {ChildComponent} from './child.component';
import {LoggerService}  from './logger.service';

@Component({
  selector: 'after-content',
  template: `
  <div class="after-content">
    <div>-- child content begins --</div>

    <ng-content></ng-content>

    <div>-- child content ends --</div>
  </div>
  `,
  styles: ['.after-content {background: LightCyan; padding: 8px;}'],

})
export class AfterContentComponent
  implements AfterContentChecked, AfterContentInit, AfterViewInit {

  private _logger:LoggerService;

  constructor(logger:LoggerService){
    this._logger = logger;
    logger.log('AfterContent ctor: ' + this._getMessage());
  }

  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent) contentChild: ChildComponent;

  // Query for a VIEW child of type`ChildComponent`
  // No such VIEW child exists!
  // This component holds content but no view of that type.
  @ViewChild(ChildComponent) viewChild: ChildComponent;


  ///// Hooks
  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    this._logger.log('AfterContentInit: ' + this._getMessage());
  }

  ngAfterViewInit() {
    this._logger.log(`AfterViewInit: There is ${this.viewChild ? 'a' : 'no'} view child`);
  }

  private _prevHero:string;
  ngAfterContentChecked() {
    // contentChild is updated after the content has been checked
    // Called frequently; only report when the hero changes
    if (!this.contentChild || this._prevHero === this.contentChild.hero) {return;}
    this._prevHero = this.contentChild.hero;
    this._logger.log('AfterContentChecked: ' + this._getMessage());
  }

  private _getMessage(): string {
    let cmp = this.contentChild;
    return cmp ? `"${cmp.hero}" child content` : 'no child content';
  }

}

/***************************************/

@Component({
  selector: 'after-content-parent',
  template: `
  <div class="parent">
    <h2>AfterContent</h2>

    <after-content>
      <input [(ngModel)]="hero">
      <button (click)="showChild = !showChild">Toggle child view</button>

      <my-child *ngIf="showChild" [hero]="hero"></my-child>
    </after-content>

    <h4>-- Lifecycle Hook Log --</h4>
    <div *ngFor="#msg of hookLog">{{msg}}</div>
  </div>
  `,
  styles: ['.parent {background: powderblue; padding: 8px; margin:100px 8px;}'],
  directives: [AfterContentComponent, ChildComponent],
  providers:[LoggerService]
})
export class AfterContentParentComponent {

  hookLog:string[];
  hero = 'Magneta';
  showChild = true;

  constructor(logger:LoggerService){
    this.hookLog = logger.logs;
  }
}
