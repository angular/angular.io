import { NgModule }     from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { routedComponents, routing } from './hero.routing';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ routedComponents ]
})
export class HeroModule { }
