// #docregion
import {Component, ContentChildren, QueryList} from 'angular2/core';
import {SequenceItemComponent} from './sequence-item.component'

@Component({
  selector: 'sequence-viewer',
  template: `
    <h2>Sequence items</h2>
    <div>
      <button (click)="showAll()">Show All</button>
      <button (click)="showLast5()">Limit to last 5 items</button>
    <div>
    <ul>
      <my-sequence-item *ngFor="#item of getFilteredItems()"
        [index]="item.index"
        [value]="item.value">
      </my-sequence-item>
    </ul>
    Count of content children: {{items.length}}<br/>
    Count of view children: {{getFilteredItems().length}}<br/>
    Count of content item changes: {{numChanges}}
  `,
  directives: [SequenceItemComponent]
})
export class SequenceViewerComponent {
  @ContentChildren(SequenceItemComponent) items: QueryList<SequenceItemComponent>;

  numChanges = 0;
  filter: (item: SequenceItemComponent) => boolean;

  constructor() {
    this.showAll();
  }

  showAll() {
    this.filter = () => true;
  }

  showLast5() {
    this.filter = item => item.index >= this.items.length - 4;
  }

  getFilteredItems() {
    return this.items.toArray().filter(this.filter);
  }

  ngAfterContentInit() {
    this.numChanges++;
    this.items.changes.subscribe( item => this.numChanges++)
  }
}
// #enddocregion