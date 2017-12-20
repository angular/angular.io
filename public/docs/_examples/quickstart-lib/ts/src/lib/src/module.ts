// #docregion
import { NgModule } from '@angular/core';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';

@NgModule({
  declarations: [LibComponent],
  providers: [LibService],
  exports: [LibComponent]
})
export class LibModule { }
