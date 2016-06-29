/// <reference path='../_protractor/e2e.d.ts' />
'use strict';

import { initalPageAndUpdateHeroTests } from '../toh-2/toh-spec-shared';

describe('Tutorial part 3', () => {
  beforeAll(() => browser.get(''));
  initalPageAndUpdateHeroTests();
});
