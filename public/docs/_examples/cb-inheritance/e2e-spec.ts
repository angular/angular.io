'use strict'; // necessary for es6 output in node

import { browser, element, by } from 'protractor';

// gulp run-e2e-tests --filter=cb-inheritance
describe('Inheritance Cookbook', () => {

  beforeAll(() => {
    browser.get('');
  });

  describe('Basic Example', () => {

    it('shows movie list with removal buttons', () => {
      const movies = element(by.tagName('my-movie-list'));
      const avengers = movies.element(by.cssContainingText('li', 'Avengers'));

      expect(avengers.isPresent()).toBe(true);
      avengers.element(by.buttonText('X')).click();
      expect(avengers.isPresent()).toBe(false);
    });

    it('shows album list with genre and removal buttons', () => {
      const albums = element(by.tagName('my-album-list'));
      const title = albums.element(by.tagName('h2'));
      const abbeyRoad = albums.element(by.cssContainingText('li', 'The Beatles: Abbey Road'));

      expect(title.getText()).toEqual('Classic Rock Albums');
      expect(abbeyRoad.isPresent()).toBe(true);
      abbeyRoad.element(by.buttonText('X')).click();
      expect(abbeyRoad.isPresent()).toBe(false);
    });

  });

  describe('Class Metadata Example', () => {

    it('shows a list of numbers and a list of superpower titles', () => {
      const base = element(by.tagName('my-class-metadata-example'));
      const superList = base.element(by.tagName('my-list'));
      const subList = base.element(by.tagName('my-superpower-list'));

      ['1', '2', '3'].forEach(itm => {
        expect(superList.element(by.cssContainingText('li', itm)).isPresent()).toBe(true);
      });
      ['Flight', 'Shield'].forEach(itm => {
        expect(subList.element(by.cssContainingText('li', itm)).isPresent()).toBe(true);
      });
    });

  });

  describe('Property, Method, and Constructor Example', () => {

    it('has a canvas with an initial size that reacts to window resize', () => {
      const base = element(by.tagName('my-property-metadata-example'));
      const canvas = base.element(by.tagName('canvas'));

      expect(canvas.getAttribute('width')).toBe('300');
      expect(canvas.getAttribute('height')).toBe('200');
      browser.manage().window().setSize(500, 400);
      expect(canvas.getAttribute('width')).not.toBe('300');
      expect(canvas.getAttribute('height')).not.toBe('200');
    });

  });

});
