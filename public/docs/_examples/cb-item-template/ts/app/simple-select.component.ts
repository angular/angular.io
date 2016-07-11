// #docplaster
// #docregion
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

interface ItemContext {
  item: any;
  index: number;
}

// #docregion component
// #docregion metadata
@Component({
  selector: 'simple-select',
  template:
  `
    <button (click)='toggleItems()' class='select-root'>
      
      <template 
        [ngTemplateOutlet]='itemTemplateRef'
        [ngOutletContext]='{ item: value, index: -1 }'>
      </template>

    </button>
  
    <ul *ngIf='isShowingItems' class='select-items'>
      <li *ngFor='let item of items ; let index = index ;' (click)='selectItem( item )'>
        
        <template 
          [ngTemplateOutlet]='itemTemplateRef'
          [ngOutletContext]='{ item: item, index: index }'>
        </template>

      </li>
    </ul>
  `
})
// #enddocregion metadata
export class SimpleSelectComponent {

  public isShowingItems: boolean;
  @Input() public items: any[];
  public itemTemplateRef: TemplateRef<ItemContext>;
  @Input() public value: any;
  @Output() public valueChange: EventEmitter<any>;

  constructor() {
    this.isShowingItems = false;
    this.items = [];
    this.itemTemplateRef = null;
    this.value = null;
    this.valueChange = new EventEmitter();
  }

  // #docregion setters
  @Input()
  set template(newTemplate: TemplateRef<ItemContext>) {
    if (newTemplate) {
      this.itemTemplateRef = newTemplate;
    }
  }

  @ContentChild(TemplateRef)
  set contentChildTemplateRef(newTemplate: TemplateRef<ItemContext>) {
    if (newTemplate) {
      this.itemTemplateRef = newTemplate;
    }
  }
  // #enddocregion setters

  public selectItem(item: any) {
    this.valueChange.emit(item);
    this.toggleItems();
  }

  public toggleItems() {
    this.isShowingItems = ! this.isShowingItems;
  }

}
// #enddocregion component
