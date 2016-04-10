// Based on https://github.com/angular/angular/blob/master/modules/angular2/test/testing/testing_public_spec.ts
import { Component, Injectable } from 'angular2/core';
import { NgIf } from 'angular2/common';

// Let TypeScript know about the special SystemJS __moduleName variable
declare var __moduleName: string;

// moduleName is not set in some module loaders; set it explicitly
if (!__moduleName) {
  __moduleName = `http://${location.host}/${location.pathname}/app/`;
}
// console.log(`The __moduleName is ${__moduleName} `);



////////// The App: Services and Components for the tests. //////////////

////////// Services ///////////////

@Injectable()
export class FancyService {
  value: string = 'real value';
  getAsyncValue() { return Promise.resolve('async value'); }
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
  template: `MyIf(<span *ngIf="showMore">More</span>)`,
  directives: [NgIf]
})
export class MyIfComp {
  showMore: boolean = false;
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
  moduleId: __moduleName,
  selector: 'external-template-comp',
  templateUrl: 'public-external-template.html'
})
export class ExternalTemplateComp { }


@Component({
  selector: 'bad-template-comp',
  templateUrl: 'non-existant.html'
})
export class BadTemplateUrl { }
