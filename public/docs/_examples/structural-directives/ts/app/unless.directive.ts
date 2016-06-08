// #docplaster
// #docregion
// #docregion unless-declaration
import { Directive, Input } from '@angular/core';

// #enddocregion unless-declaration
import { TemplateRef, ViewContainerRef } from '@angular/core';

// #docregion unless-declaration
@Directive({ selector: '[myUnless]' })
export class UnlessDirective {
  // #enddocregion unless-declaration

  // #docregion unless-constructor
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) { }
  // #enddocregion unless-constructor

  // #docregion unless-set
  @Input() set myUnless(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  // #enddocregion unless-set
  // #docregion unless-declaration
}
// #enddocregion unless-declaration
// #enddocregion
