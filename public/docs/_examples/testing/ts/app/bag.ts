// Based on https://github.com/angular/angular/blob/master/modules/angular2/test/testing/testing_public_spec.ts
/* tslint:disable */
import { Component, EventEmitter, Injectable, Input, Output, Optional,
         OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

import { Observable }     from 'rxjs/Rx';

////////// The App: Services and Components for the tests. //////////////

////////// Services ///////////////

@Injectable()
export class FancyService {
  value: string = 'real value';

  getValue() { return this.value; }

  getAsyncValue() { return Promise.resolve('async value'); }

  getObservableValue() { return Observable.of('observable value'); }

  getTimeoutValue() {
    return new Promise((resolve, reject) => { setTimeout(() => {resolve('timeout value'); }, 10); });
  }

  getObservableDelayValue() { return Observable.of('observable delay value').delay(10); }
}

@Injectable()
export class MockFancyService extends FancyService {
  value: string = 'mocked out value';
}

//////////// Components /////////////

@Component({
  selector: 'button-comp',
  template: `<button (click)='clicked()'>Click me!</button>`
})
export class ButtonComp {
  wasClicked = false;
  clicked() { this.wasClicked = true; }
}

@Component({
  selector: 'input-comp',
  template: `<input [(ngModel)]="name">`
})
export class InputComp {
  name = 'John';
}

@Component({
  selector: 'child-comp',
  template: `<span>Original {{childBinding}}</span>`
})
export class ChildComp {
  childBinding = 'Child';
}


@Component({
  selector: 'child-comp',
  template: `<span>Mock</span>`
})
export class MockChildComp { }


@Component({
  selector: 'parent-comp',
  template: `Parent(<child-comp></child-comp>)`,
  directives: [ChildComp]
})
export class ParentComp { }


@Component({
  selector: 'my-if-comp',
  template: `MyIf(<span *ngIf="showMore">More</span>)`
})
export class MyIfComp {
  showMore = false;
}

@Component({
  selector: 'child-child-comp',
  template: '<span>ChildChild</span>'
})
export class ChildChildComp { }


@Component({
  selector: 'child-comp',
  template: `<span>Original {{childBinding}}(<child-child-comp></child-child-comp>)</span>`,
  directives: [ChildChildComp]
})
export class ChildWithChildComp {
  childBinding = 'Child';
}


@Component({
  selector: 'child-child-comp',
  template: `<span>ChildChild Mock</span>`
})
export class MockChildChildComp { }


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
  `,
  directives: [ExternalTemplateComp]
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
  `,
  directives: [MyIfChildComp]
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

export const BAG_PROVIDERS = [FancyService];

export const BAG_DIRECTIVES = [
  ButtonComp,
  ChildChildComp, ChildComp, ChildWithChildComp,
  ExternalTemplateComp, CompWithCompWithExternalTemplate,
  InputComp,
  MyIfComp, MyIfChildComp, MyIfParentComp,
  MockChildComp, MockChildChildComp,
  ParentComp,
  TestProvidersComp, TestViewProvidersComp
];
