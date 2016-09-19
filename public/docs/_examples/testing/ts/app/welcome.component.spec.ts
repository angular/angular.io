// #docplaster
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { DebugElement }              from '@angular/core';

import { UserService }      from './model';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {

  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService; // the actually injected service
  let welcomeEl: DebugElement;  // the element with the welcome message

  let userServiceStub: {
    isLoggedIn: boolean;
    user: { name: string}
  };

  // #docregion setup
  beforeEach(() => {
    // stub UserService for test purposes
    // #docregion user-service-stub
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };
    // #enddocregion user-service-stub

    // #docregion config-test-module
    TestBed.configureTestingModule({
       declarations: [ WelcomeComponent ],
    // #enddocregion setup
    // providers:    [ UserService ]  // a real service would be a problem!
    // #docregion setup
       providers:    [ {provide: UserService, useValue: userServiceStub } ]
    });
    // #enddocregion config-test-module

    fixture = TestBed.createComponent(WelcomeComponent);
    comp    = fixture.componentInstance;

    // #enddocregion setup
    // #docregion inject-from-testbed
    // UserService provided to the TestBed
    userService = TestBed.get(UserService);
    // #enddocregion inject-from-testbed
    // #docregion setup
    // #docregion injected-service
    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    // #enddocregion injected-service

    //  get the "welcome" element by CSS selector (e.g., by class name)
    welcomeEl = fixture.debugElement.query(By.css('.welcome'));
  });
  // #enddocregion setup

  // #docregion tests
  it('should welcome the user', () => {
    fixture.detectChanges(); // trigger data binding

    let content = welcomeEl.nativeElement.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet

    fixture.detectChanges(); // trigger data binding

    let content = welcomeEl.nativeElement.textContent;
    expect(content).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet

    fixture.detectChanges(); // trigger data binding

    let content = welcomeEl.nativeElement.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });
  // #enddocregion tests

  it('orig stub and injected UserService are not the same object', () => {
    expect(userServiceStub === userService).toBe(false);
  });
});
