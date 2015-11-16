// #docplaster
// #docregion
// #docregion unless-declaration
import {Directive, Input} from 'angular2/core';

// #enddocregion unless-declaration
import {TemplateRef, ViewContainerRef} from 'angular2/core';

// #docregion unless-declaration
@Directive({ selector: '[myUnless]' })
export class UnlessDirective {
  // #enddocregion unless-declaration

  // #docregion unless-constructor
  constructor(
    private _templateRef: TemplateRef,
    private _viewContainer: ViewContainerRef
    ) { }
  // #enddocregion unless-constructor

  // #docregion unless-set
  @Input() set myUnless(condition: boolean) {
    if (!condition) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }
  // #enddocregion unless-set
  // #docregion unless-declaration
}
// #enddocregion unless-declaration
// #enddocregion
