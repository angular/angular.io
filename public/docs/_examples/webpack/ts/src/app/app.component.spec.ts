// #docregion
import {
  addProviders,
  inject,
} from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEach(() => {
    addProviders([
      AppComponent
    ]);
  });

  it ('should work', inject([AppComponent], (app: AppComponent) => {
    // Add real test here
    expect(2).toBe(2);
  }));
});
// #enddocregion
