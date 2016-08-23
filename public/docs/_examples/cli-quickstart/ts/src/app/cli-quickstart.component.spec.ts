import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { CliQuickstartAppComponent } from '../app/cli-quickstart.component';

beforeEachProviders(() => [CliQuickstartAppComponent]);

describe('App: CliQuickstart', () => {
  it('should create the app',
      inject([CliQuickstartAppComponent], (app: CliQuickstartAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'cli-quickstart works!\'',
      inject([CliQuickstartAppComponent], (app: CliQuickstartAppComponent) => {
    expect(app.title).toEqual('cli-quickstart works!');
  }));
});
