// #docregion
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HeroFormTemplateComponent } from './hero-form-template.component';

@NgModule({
  imports:      [ SharedModule, FormsModule ],
  declarations: [ HeroFormTemplateComponent ],
  exports:      [ HeroFormTemplateComponent ]
})
export class HeroFormTemplateModule { }
