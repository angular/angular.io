/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgioCheatsheetComponent } from './ngio-cheatsheet.component';

describe('NgioCheatsheetComponent', () => {
  let component: NgioCheatsheetComponent;
  let fixture: ComponentFixture<NgioCheatsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgioCheatsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgioCheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
