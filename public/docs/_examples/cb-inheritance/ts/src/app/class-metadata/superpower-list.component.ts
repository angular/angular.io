// #docregion
import { Component } from '@angular/core';

import { ListComponent } from './list.component';
import { Superpower } from '../models';

@Component({
  moduleId: module.id,
  selector: 'my-superpower-list',
  templateUrl: './list.component.html' // Must redeclare!
})
export class SuperpowerListComponent extends ListComponent {

  itemToString(item: Superpower): string {
    return item.title;
  }

}
