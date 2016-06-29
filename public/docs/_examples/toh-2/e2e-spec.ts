/// <reference path='../_protractor/e2e.d.ts' />
'use strict';

import { initalPageAndUpdateHeroTests } from './toh-spec-shared';

describe('Tutorial part 2', () => {
  beforeAll(() => browser.get(''));
  initalPageAndUpdateHeroTests();
});
