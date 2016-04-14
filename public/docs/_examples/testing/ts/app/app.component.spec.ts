/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

import { By }       from 'angular2/platform/browser';
import { provide  } from 'angular2/core';

import {
  beforeEach, beforeEachProviders,
  describe, ddescribe, xdescribe,
  expect, it, iit, xit,
  inject, injectAsync,
  ComponentFixture, TestComponentBuilder
} from 'angular2/testing';

import { Hero, HeroService, MockHeroService } from './mock-hero.service';

import { Router,       MockRouter,
         RouterLink,   MockRouterLink,
         RouterOutlet, MockRouterOutlet} from './mock-router';

describe('AppComponent', () => {
  let fixture: ComponentFixture;
  let comp:    AppComponent;

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .overrideDirective(AppComponent, RouterLink,   MockRouterLink)
      .overrideDirective(AppComponent, RouterOutlet, MockRouterOutlet)
      .overrideProviders(AppComponent, [
        provide(HeroService, {useClass: MockHeroService}),
        provide(Router,      {useClass: MockRouter}),
      ])
      .createAsync(AppComponent)
      .then(fix => {
        fixture = fix;
        comp = fixture.debugElement.componentInstance;
      });
  }));

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('can get title from template', () => {
    fixture.detectChanges();
    let titleEl = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleEl).toHaveText(comp.title);
  });

  it('can get RouterLinks from template', () => {
    fixture.detectChanges();

    let links = fixture.debugElement
      .queryAll(function (de) { return de.componentInstance instanceof MockRouterLink; })
      .map(de => <MockRouterLink> de.componentInstance);

    expect(links.length).toEqual(2, 'should have 2 links');
    expect(links[0].routeParams[0]).toEqual('Dashboard', '1st link should go to Dashboard');
    expect(links[1].routeParams[0]).toEqual('Heroes', '1st link should go to Heroes');

    let result = links[1].onClick();
    expect(result).toEqual(false, 'click should prevent default browser behavior');
  });

  it('can click Heroes link in template', () => {
    fixture.detectChanges();

    // Heroes RouterLink DebugElement
    let heroesDe = fixture.debugElement
      .queryAll(function (de) { return de.componentInstance instanceof MockRouterLink; })[1];

    expect(heroesDe).not.toBeNull('should 2nd link');

    let link = <MockRouterLink> heroesDe.componentInstance;
    expect(link.navigatedTo).toBeNull('link should not have navigate yet');

    heroesDe.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(link.navigatedTo[0]).toEqual('Heroes');

  });
});

