// For more examples:
//   https://github.com/angular/angular/blob/master/modules/@angular/router/test/integration.spec.ts

import { async, ComponentFixture, fakeAsync, TestBed, tick,
} from '@angular/core/testing';

import { SpyLocation } from '@angular/common/testing';

// tslint:disable:no-unused-variable
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';

import { newEvent } from '../test/dom-event';
// tslint:enable:no-unused-variable

// r - for relatively obscure router symbols
import * as r                         from  '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';

import { By }                 from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location }           from '@angular/common';

import { AppModule }              from './app.module';
import { AppComponent }           from './app.component';
import { AboutComponent }         from './about.component';
import { DashboardHeroComponent } from './dashboard/dashboard-hero.component';

// tslint:disable:no-unused-variable
import HeroModule                 from './hero/hero.module';  // should be lazy loaded
import { HeroListComponent }      from './hero/hero-list.component';
import { HeroDetailComponent }    from './hero/hero-detail.component';
// tslint:enable:no-unused-variable

let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let page:     Page;
let router:   Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should navigate to "Dashboard" immediately', fakeAsync(() => {
    createComponent();
    expect(location.path()).toEqual('/dashboard', 'after initialNavigation()');
    expectElementOf(DashboardHeroComponent);
  }));

  it('should navigate to "About" on click', fakeAsync(() => {
    createComponent();

    // page.aboutLinkDe.triggerEventHandler('click', null); // fails
    // page.aboutLinkDe.nativeElement.dispatchEvent(newEvent('click')); // fails
    page.aboutLinkDe.nativeElement.click();
    advance();
    expectPathToBe('/about');
    expectElementOf(AboutComponent);

    page.expectEvents([
      [r.NavigationStart, '/about'], [r.RoutesRecognized, '/about'],
      [r.NavigationEnd, '/about']
    ]);
  }));

  it('should navigate to "About" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.go('/about');
    // locationSpyLocation.simulateHashChange('/about'); // also works.
    advance();
    expectPathToBe('/about');
    expectElementOf(AboutComponent);
  }));


  ///////// Can't get lazy loaded Heroes to work yet
  xit('should navigate to "Heroes" on click', fakeAsync(() => {
    createComponent();
    page.heroesLinkDe.nativeElement.click();
    advance();
    expectPathToBe('/heroes');
    expectElementOf(HeroListComponent);
  }));

  xit('can navigate to "Heroes" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.go('/heroes');
    advance();
    expectPathToBe('/heroes');
    expectElementOf(HeroListComponent);

    page.expectEvents([
      [r.NavigationStart, '/heroes'], [r.RoutesRecognized, '/heroes'],
      [r.NavigationEnd, '/heroes']
    ]);
  }));
});

////// Helpers /////////

/** Wait a tick, then detect changes */
function advance(): void {
  tick();
  fixture.detectChanges();
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  router = injector.get(Router);
  location = injector.get(Location);

  router.initialNavigation();
  advance();

  page = new Page();
}

class Page {
  aboutLinkDe:     DebugElement;
  dashboardLinkDe: DebugElement;
  heroesLinkDe:    DebugElement;
  recordedEvents:  any[]  =  [];

  expectEvents(pairs: any[]) {
    const events = this.recordedEvents;
    expect(events.length).toEqual(pairs.length, 'actual/expected events length mismatch');
    for (let i = 0; i < events.length; ++i) {
      expect((<any>events[i].constructor).name).toBe(pairs[i][0].name, 'unexpected event name');
      expect((<any>events[i]).url).toBe(pairs[i][1], 'unexpected event url');
    }
  }

  constructor() {
    router.events.forEach(e => this.recordedEvents.push(e));
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.aboutLinkDe     = links[2];
    this.dashboardLinkDe = links[0];
    this.heroesLinkDe    = links[1];
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}
