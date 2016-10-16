// #docregion
import { NgModule } from '@angular/core';

import { HeroProfileComponent } from './hero-profile.component';

@NgModule({
  declarations: [HeroProfileComponent],
  exports: [HeroProfileComponent]
})
export class HeroProfileModule {

}
