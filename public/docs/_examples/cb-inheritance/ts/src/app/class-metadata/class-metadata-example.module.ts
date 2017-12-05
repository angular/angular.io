// #docregion
import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';

import { ListComponent }           from './list.component';
import { SuperpowerListComponent } from './superpower-list.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ListComponent, SuperpowerListComponent ],
  exports: [ ListComponent, SuperpowerListComponent ]
})
export class ClassMetadataExampleModule {
}
