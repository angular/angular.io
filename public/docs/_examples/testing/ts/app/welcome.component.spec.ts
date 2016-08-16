import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { DebugElement }              from '@angular/core';

import { UserService }      from './shared/user.service';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {

  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService; // the actually injected service
  let welcomeEl: DebugElement;  // the element with the welcome message

  beforeEach(() => {

    // fake UserService for test purposes
    let fakeUserService = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    // declare the component
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      /*
      providers:    [ UserService ]  // a real service would be a problem!
      */
      providers:    [ {provide: UserService, useValue: fakeUserService } ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);

    // WelcomeComponent test instance
    comp = fixture.componentInstance;

    // UserService that was actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);

    // find DOM element abstraction (DebugElement) by CSS class namen
    welcomeEl = fixture.debugElement.query(By.css('.welcome'));

    // or get the element by position (we know its the first child)
    welcomeEl = fixture.debugElement.children[0];
  });

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

});
