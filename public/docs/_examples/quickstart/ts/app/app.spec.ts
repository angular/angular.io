import { iit,it, ddescribe, describe, expect, injectAsync, TestComponentBuilder, beforeEachProviders } from 'angular2/testing';
import { provide, Type } from 'angular2/core';
import { AppComponent } from './app';

type TCB = TestComponentBuilder;

describe('AppComponent', () => {
  beforeEachProviders(() => <Type[]> []);

  it('should have correct text', injectAsync([TestComponentBuilder], (tcb: TCB) => {
    return tcb.createAsync(AppComponent).then((fixture) => {
      // fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;

      expect(compiled).toContainText('My First Angular 2 App');
      expect(compiled.querySelector('h1')).toHaveText('My First Angular 2 App');
    });
  }));
});
