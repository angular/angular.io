import {Component, Directive, Input, ContentChildren, QueryList} from 'angular2/angular2';

// #docregion parent-comp-def
@Component({
  selector: 'parent-comp',
  template: `
    <child-comp *ng-for="#child of myContent"
      [child-prop]='child.myProp'>
    </child-comp>
  `,
  directives: [ChildComponent]
})
// #enddocregion parent-comp-def
// #docregion parent-comp
export class ParentComponent {
  @ContentChildren(ChildContent) myContent: QueryList<ChildContent>;
  // ...
}
// #enddocregion parent-comp

// #docregion child-comp
@Component({
  selector: 'child-comp',
  template: `...`
})
export class ChildComponent {
  @Input() childProp;
  // ...
}
// #enddocregion child-comp

// #docregion child-content
@Directive({
  selector: 'child-content'
})
export class ChildContent {
  // ...
}
// #enddocregion child-content