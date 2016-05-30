import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2CliQuickstartAppComponent } from '../app/angular2-cli-quickstart.component';

beforeEachProviders(() => [Angular2CliQuickstartAppComponent]);

describe('App: Angular2CliQuickstart', () => {
  it('should create the app',
      inject([Angular2CliQuickstartAppComponent], (app: Angular2CliQuickstartAppComponent) => {
    expect(app).toBeTruthy();
  }));

  // #docregion title
  it('should have as title \'My First Angular 2 App\'',
      inject([Angular2CliQuickstartAppComponent], (app: Angular2CliQuickstartAppComponent) => {
    expect(app.title).toEqual('My First Angular 2 App');
  }));
  // #enddocregion title
});
