// #docregion
import { Component }         from '@angular/core';
import { HeroFormComponent } from './hero-form.component';

@Component({
  selector: 'my-app',
  template: '<hero-form></hero-form>',
  directives: [HeroFormComponent]
})
export class AppComponent { }
