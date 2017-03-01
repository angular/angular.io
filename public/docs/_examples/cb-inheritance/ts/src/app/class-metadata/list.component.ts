// #docregion
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  @Input() list: any[];

  itemToString(item: any): string  {
    return item && item.toString();
  }

}
