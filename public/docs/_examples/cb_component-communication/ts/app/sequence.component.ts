// #docregion
import {Component, ViewChild} from 'angular2/core';
import {SequenceItem} from './sequenceitem.component';
import {SequenceViewer} from './sequenceviewer.component';

@Component({
  selector: 'sequence',
  templateUrl: 'app/sequence-template.html',
  directives: [SequenceViewer, SequenceItem]
})
export class Sequence {
  @ViewChild(SequenceViewer) viewer: SequenceViewer;

  generatedItems: SequenceItem[] = [];
    
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
