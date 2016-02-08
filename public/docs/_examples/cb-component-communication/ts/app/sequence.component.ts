// #docregion
import {Component, ViewChild} from 'angular2/core';
import {SequenceItemComponent} from './sequence-item.component';
import {SequenceViewerComponent} from './sequence-viewer.component';

@Component({
  selector: 'my-sequence',
  templateUrl: 'app/sequence.component.html',
  directives: [SequenceViewerComponent, SequenceItemComponent]
})
export class Sequence {
  @ViewChild(SequenceViewerComponent) viewer: SequenceViewerComponent;

  generatedItems: SequenceItemComponent[] = [];

  nextItem() {
    let allItems = this.viewer.items.toArray();
    let itemCount = allItems.length;
    let nextItem = {
      index: allItems[itemCount-1].index + 1,
      value: allItems[itemCount-1].value + allItems[itemCount-2].value
    }
    this.generatedItems.push(nextItem);
  }
}
// #enddocregion
