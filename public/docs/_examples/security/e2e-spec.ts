/// <reference path="../_protractor/e2e.d.ts" />
'use strict';
describe('Security E2E Tests', () => {
  beforeAll(function() { browser.get(''); });

  it('sanitizes innerHTML', () => {
    let interpolated = element(By.className('e2e-inner-html-interpolated'));
    expect(interpolated.getText())
        .toContain('Template <script>alert("0wned")</script> <b>Syntax</b>');
    let bound = element(By.className('e2e-inner-html-bound'));
    expect(bound.getText()).toContain('Template alert("0wned") Syntax');
    let bold = element(By.css('.e2e-inner-html-bound b'));
    expect(bold.getText()).toContain('Syntax');
  });

  it('binds trusted URLs', () => {
    let dangerousUrl = element(By.className('e2e-dangerous-url'));
    expect(dangerousUrl.getAttribute('href')).toMatch(/^javascript:alert/);
  });

  it('binds trusted resource URLs', () => {
    let iframe = element(By.className('e2e-iframe'));
    expect(iframe.getAttribute('src')).toMatch(/^https:\/\/www.youtube.com\//);
  });
});
