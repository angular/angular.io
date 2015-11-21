// #docregion
import {
  Component, Input, Output,
  AfterContentInit,  ContentChild,
  AfterViewChecked, AfterViewInit, ViewChild
} from 'angular2/core';

import {ChildComponent} from './child.component';
import {LoggerService}  from './logger.service';

@Component({
  selector: 'after-view-parent',
  template: `
  <div class="parent">
    <h2>AfterView</h2>

    <div>
      <input [(ngModel)]="hero">
      <button (click)="showChild = !showChild">Toggle child view</button>

      <my-child *ngIf="showChild" [hero]="hero"></my-child>
    </div>

    <h4>-- Lifecycle Hook Log --</h4>
    <div *ngFor="#msg of hookLog">{{msg}}</div>
  </div>
  `,
  styles: ['.parent {background: burlywood; padding: 8px; margin:100px 8px;}'],
  directives: [ChildComponent],
  providers:[LoggerService]
})
export class AfterViewParentComponent
  implements AfterContentInit, AfterViewChecked, AfterViewInit {

  private _logger:LoggerService;

  constructor(logger:LoggerService){
    this._logger = logger;
    this.hookLog = logger.logs;
    logger.log('AfterView ctor: ' + this._getMessage());
  }

  hookLog:string[];
  hero = 'Magneta';
  showChild = true;

  // Query for a CONTENT child of type `ChildComponent`
  // No such CONTENT child exists!
  // This component holds a view but no content of that type.
  @ContentChild(ChildComponent) contentChild: ChildComponent;

  // Query for a VIEW child of type `ChildComponent`
  @ViewChild(ChildComponent) viewChild: ChildComponent;


  ///// Hooks
  ngAfterContentInit() {
    this._logger.log(`AfterContentInit: There is ${this.contentChild ? 'a' : 'no'} content child`);
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this._logger.log('AfterViewInit: ' + this._getMessage());
  }

  private _prevHero:string;
  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    // Called frequently; only report when the hero changes
    if (!this.viewChild || this._prevHero === this.viewChild.hero) {return;}
    this._prevHero = this.viewChild.hero;
    this._logger.log('AfterViewChecked: ' + this._getMessage());
  }

  private _getMessage(): string {
    let cmp = this.viewChild;
    return cmp ? `"${cmp.hero}" child view` : 'no child view';
  }

}
