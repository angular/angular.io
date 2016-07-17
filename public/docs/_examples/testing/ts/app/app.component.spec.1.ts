import {
  async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { ApplicationRef } from '@angular/core';
import { By }             from '@angular/platform-browser';

import { AppModule }      from './app.module';
import { AppComponent }   from './app.component';

import {
  HeroService,
  FakeHeroService
} from '../test/fake-hero.service';

import {
  Router,
  FakeRouter,
  FakeRouterLink,
  FakeRouterOutlet
} from '../test/fake-router';

// CAN'T GET THIS TO WORK
// The real RouterModule tries to do work
// because there is a RouterLink in AppComponent
// Can't figure out how to keep it from seeing the real RouterLink
// See http://plnkr.co/edit/dQPsyFmvXXTujDBZg02y?p=preview
xdescribe('AppComponent & AppModule', () => {
  let comp:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:      [AppModule],
      declarations: [FakeRouterLink, FakeRouterOutlet],
      providers: [
        // Disable module bootstrapping during testing
        { provide: ApplicationRef, useValue: {bootstrap: () => {}} },
        { provide: Router, useClass: FakeRouter }
      ]
    })

    .overrideComponent(AppComponent, {
      add: {
        providers: [{ provide: HeroService, useClass: FakeHeroService}]
      }
    })

    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('can get title from template', () => {
    fixture.detectChanges();
    let titleEl = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleEl.textContent).toContain(comp.title);
  });

  it('can get RouterLinks from template', () => {
    fixture.detectChanges();

    let links = fixture.debugElement
      // find all elements with an attached FakeRouterLink directive
      .queryAll(By.directive(FakeRouterLink))
      // use injector to get the RouterLink directive instance attached to each element
      .map(de => de.injector.get(FakeRouterLink) as FakeRouterLink);

    expect(links.length).toEqual(2, 'should have 2 links');
    expect(links[0].linkParams).toEqual('/dashboard', '1st link should go to Dashboard');
    expect(links[1].linkParams).toEqual('/heroes', '1st link should go to Heroes');
  });

  it('can click Heroes link in template', () => {
    fixture.detectChanges();

    // Heroes RouterLink DebugElement
    let heroesLinkDe = fixture.debugElement
      .queryAll(By.directive(FakeRouterLink))[1];

    expect(heroesLinkDe).toBeDefined('should have a 2nd RouterLink');

    let link = heroesLinkDe.injector.get(FakeRouterLink) as FakeRouterLink;

    expect(link.navigatedTo).toBeNull('link should not have navigate yet');

    heroesLinkDe.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(link.navigatedTo).toEqual('/heroes');
  });
});
