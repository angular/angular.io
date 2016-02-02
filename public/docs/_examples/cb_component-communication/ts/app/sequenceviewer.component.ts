// #docregion
import {Component, ContentChildren, QueryList} from 'angular2/core';
import {SequenceItem} from './sequenceitem.component'

@Component({
  selector: 'sequence-viewer',
  template: `
    <h2>Sequence items</h2>
    <div>
      <button (click)="showAll()">Show All</button>
      <button (click)="showLast5()">Limit to last 5 items</button>
    <div>
    <ul>
      <sequence-item *ngFor="#item of getFilteredItems()"
        [index]="item.index"
        [value]="item.value">
      </sequence-item>
    </ul>
    #of SequenceViewer content children: {{items.length}}<br/>
    #of SequenceViewer view children: {{getFilteredItems().length}}<br/>
    #of content item changes: {{numChanges}}
  `,
  directives: [SequenceItem]
})
export class SequenceViewer {
  @ContentChildren(SequenceItem) items: QueryList<SequenceItem>;
  
  numChanges = 0;
  filter: (item: SequenceItem) => boolean;
  
  constructor() {
    this.showAll();
  }
  
  showAll() {
    this.filter = (item: SequenceItem) => true;
  }

  showLast5() {
    this.filter = (item: SequenceItem) => item.index >= this.items.length - 4;
  }

  getFilteredItems() {
    return this.items.toArray().filter(this.filter);
  }
  
  ngAfterContentInit() {
    this.numChanges++;
    this.items.changes.subscribe(
      (item: SequenceItem) => {
        this.numChanges++;
      })
  }
}
// #enddocregion