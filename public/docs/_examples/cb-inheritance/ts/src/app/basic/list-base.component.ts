// #docregion
import { Input } from '@angular/core';

export abstract class ListBaseComponent<T> {
  @Input() list: T[];

  remove(item: T) {
    const index = this.list.indexOf(item);
    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }

}
