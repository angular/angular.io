/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Building Custom Form Controls With ngModel', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should all be off', function () {
    const toggles = element.all(by.css('cb-toggle'));

    expect(toggles.getAttribute('class')).toContain('for-off');
    expect(toggles.getAttribute('class')).not.toContain('for-on');
  });

  it('should all toggle on', function () {
    const toggle = element.all(by.css('cb-toggle')).first();

    toggle.click();

    const toggles = element.all(by.css('cb-toggle'));

    expect(toggles.getAttribute('class')).toContain('for-on');
    expect(toggles.getAttribute('class')).not.toContain('for-off');
  });

  it('should use ng-form classes that reflect interactions', function () {
    const toggle = element.all(by.css('cb-toggle')).last();

    expect(toggle.getAttribute('class')).toContain('ng-pristine');
    expect(toggle.getAttribute('class')).not.toContain('ng-dirty');

    toggle.click();

    expect(toggle.getAttribute('class')).toContain('ng-dirty');
    expect(toggle.getAttribute('class')).not.toContain('ng-pristine');

    const toggles = element.all(by.css('cb-toggle'));

    expect(toggles.getAttribute('class')).toContain('for-off');
    expect(toggles.getAttribute('class')).not.toContain('for-on');
  });

});
