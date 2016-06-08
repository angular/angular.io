// See https://github.com/angular/angular/issues/9017
import { expect as expectCore } from '@angular/core/testing';
import { NgMatchers } from '@angular/platform-browser/testing';

export function expect(spy: Function): NgMatchers;
export function expect(actual: any): NgMatchers;
export function expect(actual: any): NgMatchers {
  return expectCore(actual) as NgMatchers;
}
