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
    <button (click)="toggleItems()" class="select-root">

      <template
        [ngTemplateOutlet]="itemTemplateRef"
        [ngOutletContext]="{ item: value, index: -1 }">
      </template>

    </button>

    <ul *ngIf="isShowingItems" class="select-items">
      <li *ngFor="let item of items ; let index = index" (click)="selectItem(item)">

        <template
          [ngTemplateOutlet]="itemTemplateRef"
          [ngOutletContext]="{ item: item, index: index }">
        </template>

      </li>
    </ul>
  `
})
// #enddocregion metadata
export class SimpleSelectComponent {
  isShowingItems = false;
  itemTemplateRef: TemplateRef<ItemContext>;
  @Input() items: any[] = [];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

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

  selectItem(item: any): void {
    this.valueChange.emit(item);
    this.toggleItems();
  }

  toggleItems(): void {
    this.isShowingItems = ! this.isShowingItems;
  }

}
// #enddocregion component
