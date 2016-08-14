import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { AppComponent }    from './app.component';
import { BannerComponent } from './banner.component';

import { Router, FakeRouter, FakeRouterLink, FakeRouterOutlet
} from '../test/fake-router';

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, BannerComponent,
        FakeRouterLink, FakeRouterOutlet
      ],
      providers:    [{ provide: Router, useClass: FakeRouter }]
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });

  }));

  tests();
});

function tests() {

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    fixture.detectChanges();

    let links = fixture.debugElement
      // find all elements with an attached FakeRouterLink directive
      .queryAll(By.directive(FakeRouterLink))
      // use injector to get the RouterLink directive instance attached to each element
      .map(de => de.injector.get(FakeRouterLink) as FakeRouterLink);

    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
    expect(links[1].linkParams).toBe('/heroes', '1st link should go to Heroes');
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
    expect(link.navigatedTo).toBe('/heroes');
  });
}

//////// Testing w/ real root module //////
// Best to avoid
// Tricky because we are disabling the router and its configuration
import { AppModule }    from './app.module';

describe('AppComponent & AppModule', () => {

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      imports:      [ AppModule ],
    })

    .overrideModule(AppModule, {
      // Must get rid of `RouterModule.forRoot` to prevent attempt to configure a router
      // Can't remove it because it doesn't have a known type (`forRoot` returns an object)
      // therefore, must reset the entire `imports`
      set: { imports: [ ]}
    })

    // Separate override because cannot both `set` and `add/remove` in same override
    .overrideModule(AppModule, {
      add: {
        declarations: [ FakeRouterLink, FakeRouterOutlet ],
        providers:    [{ provide: Router, useClass: FakeRouter }]
      }
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  tests();
});

