/* tslint:disable:forin */
import { Component, Directive, EventEmitter, Injectable,
         Input, Output, Optional, Pipe, PipeTransform,
         OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

////////// The App: Services and Components for the tests. //////////////

////////// Services ///////////////
// #docregion FancyService
@Injectable()
export class FancyService {
  protected value: string = 'real value';

  getValue() { return this.value; }
  setValue(value: string) { this.value = value; }

  getAsyncValue() { return Promise.resolve('async value'); }

  getObservableValue() { return Observable.of('observable value'); }

  getTimeoutValue() {
    return new Promise((resolve) => {
      setTimeout(() => { resolve('timeout value'); }, 10);
    });
  }

  getObservableDelayValue() {
    return Observable.of('observable delay value').delay(10);
  }
}
// #enddocregion FancyService

// #docregion DependentService
@Injectable()
export class DependentService {
  constructor(private dependentService: FancyService) { }

  getValue() { return this.dependentService.getValue(); }
}
// #enddocregion DependentService

/////////// Pipe ////////////////
/*
 * Reverse the input string.
*/
// #docregion ReversePipe
@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(s: string) {
    let r = '';
    for (let i = s.length; i; )  { r += s[--i]; };
    return r;
  }
}
// #enddocregion ReversePipe

//////////// Components /////////////

// #docregion ButtonComp
@Component({
  selector: 'button-comp',
  template: `
    <button (click)='clicked()'>Click me!</button>
    <span>{{message}}</span>`
})
export class ButtonComp {
  isOn = false;
  clicked() { this.isOn = !this.isOn; }
  get message() {
    return `The light is ${ this.isOn ? 'On' : 'Off' }`;
  }
}
// #enddocregion ButtonComp

@Component({
  selector: 'input-comp',
  template: `<input [(ngModel)]="name">`
})
export class InputComp {
  name = 'John';
}

@Directive({
  selector: 'input[value]',
  host: {
    '[value]': 'value',
    '(input)': 'valueChange.next($event.target.value)'
  },
  inputs:  ['value'],
  outputs: ['valueChange']
})
export class InputValueBinderDirective {
  value: any;
  valueChange: EventEmitter<any> = new EventEmitter();
}

@Component({
  selector: 'input-value-comp',
  template: `
    Name: <input [(value)]="name"> {{name}}
  `
})
export class InputValueBinderComp {
  name = 'Sally'; // initial value
}

@Component({
  selector: 'parent-comp',
  template: `Parent(<child-comp></child-comp>)`
})
export class ParentComp { }

@Component({
  selector: 'child-comp',
  template: `<span>Original {{childBinding}}</span>`
})
export class ChildComp {
  childBinding = 'Child';
}

@Component({
  selector: 'my-if-comp',
  template: `MyIf(<span *ngIf="showMore">More</span>)`
})
export class MyIfComp {
  showMore = false;
}

@Component({
  selector: 'my-service-comp',
  template: `injected value: {{fancyService.value}}`,
  providers: [FancyService]
})
export class TestProvidersComp {
  constructor(private fancyService: FancyService) {}
}


@Component({
  selector: 'my-service-comp',
  template: `injected value: {{fancyService.value}}`,
  viewProviders: [FancyService]
})
export class TestViewProvidersComp {
  constructor(private fancyService: FancyService) {}
}

@Component({
  moduleId: module.id,
  selector: 'external-template-comp',
  templateUrl: 'bag-external-template.html'
})
export class ExternalTemplateComp {
  serviceValue: string;

  constructor(@Optional() private service: FancyService) {  }

  ngOnInit() {
    if (this.service) { this.serviceValue = this.service.getValue(); }
  }
}

@Component({
  selector: 'comp-w-ext-comp',
  template: `
  <h3>comp-w-ext-comp</h3>
  <external-template-comp></external-template-comp>
  `
})
export class CompWithCompWithExternalTemplate { }

@Component({
  selector: 'bad-template-comp',
  templateUrl: 'non-existant.html'
})
export class BadTemplateUrlComp { }


///////// MyIfChildComp ////////
@Component({
  selector: 'my-if-child-comp',

  template: `
    <h4>MyIfChildComp</h4>
    <div>
      <label>Child value: <input [(ngModel)]="childValue"> </label>
    </div>
    <p><i>Change log:</i></p>
    <div *ngFor="let log of changeLog; let i=index">{{i + 1}} - {{log}}</div>`
})
export class MyIfChildComp implements OnInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  get childValue() { return this.value; }
  set childValue(v: string) {
    if (this.value === v) { return; }
    this.value = v;
    this.valueChange.emit(v);
  }

  changeLog: string[] = [];

  ngOnInitCalled = false;
  ngOnChangesCounter = 0;
  ngOnDestroyCalled = false;

  ngOnInit()    {
    this.ngOnInitCalled = true;
    this.changeLog.push('ngOnInit called');
  }

  ngOnDestroy() {
    this.ngOnDestroyCalled = true;
    this.changeLog.push('ngOnDestroy called');
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let propName in changes) {
      this.ngOnChangesCounter += 1;
      let prop = changes[propName];
      let cur  = JSON.stringify(prop.currentValue);
      let prev = JSON.stringify(prop.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}

///////// MyIfParentComp ////////

@Component({
  selector: 'my-if-parent-comp',
  template: `
    <h3>MyIfParentComp</h3>
    <label>Parent value:
      <input [(ngModel)]="parentValue">
    </label>
    <button (click)='clicked()'>{{toggleLabel}} Child</button><br>
    <div *ngIf="showChild"
         style="margin: 4px; padding: 4px; background-color: aliceblue;">
      <my-if-child-comp  [(value)]="parentValue"></my-if-child-comp>
    </div>
  `
})
export class MyIfParentComp implements OnInit {
  ngOnInitCalled = false;
  parentValue = 'Hello, World';
  showChild = false;
  toggleLabel = 'Unknown';

  ngOnInit() {
    this.ngOnInitCalled = true;
    this.clicked();
  }

  clicked() {
    this.showChild = !this.showChild;
    this.toggleLabel = this.showChild ? 'Close' : 'Show';
  }
}


@Component({
  selector: 'reverse-pipe-comp',
  template: `
    <input [(ngModel)]="text">
    <span>{{text | reverse}}</span>
  `,
  pipes: [ReversePipe]
})
export class ReversePipeComp {
  text = 'my dog has fleas.';
}

@Component({
  moduleId: module.id,
  selector: 'bag-comp',
  template: `
    <h1>Bag-a-specs</h1>
    <my-if-parent-comp></my-if-parent-comp>
    <hr>
    <h3>External Template Comp</h3>
    <external-template-comp></external-template-comp>
    <hr>
    <h3>Comp With External Template Comp</h3>
    <comp-w-ext-comp></comp-w-ext-comp>
    <hr>
    <h3>TitleCase Pipe</h3>
    <reverse-pipe-comp></reverse-pipe-comp>
    <hr>
    <h3>InputValueBinder Directive</h3>
    <input-value-comp></input-value-comp>
    <hr>
    <h3>ButtonComp</h3>
    <button-comp></button-comp>
  `
})
export class BagComponent {
  title = 'Test Tour of Heroes';
}
//////// Aggregations ////////////

export const bagDeclarations = [
  BagComponent,
  ButtonComp,
  ChildComp,
  ExternalTemplateComp, CompWithCompWithExternalTemplate,
  InputComp,
  InputValueBinderDirective, InputValueBinderComp,
  MyIfComp, MyIfChildComp, MyIfParentComp,
  ParentComp,
  TestProvidersComp, TestViewProvidersComp,
  ReversePipe, ReversePipeComp
];

export const bagProviders = [DependentService, FancyService];

////////////////////
////////////
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: bagDeclarations,
  providers: bagProviders,
  entryComponents: [BagComponent]
})
export class BagModule {
  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(BagComponent);
  }
}

