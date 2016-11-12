import {
  Attribute,
  Component,
  Inject,
  Optional,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
// #docregion metadata
@Component({
  moduleId: module.id,
  selector: 'hero-title',
  templateUrl: 'title.component.html'
})
// #enddocregion metadata
class TitleComponent {
  private msg: string = '';
  constructor(
    @Inject('titlePrefix') @Optional() private titlePrefix: string,
    @Attribute('title') private title: string
  ) { }

  ok() {
    this.msg = 'OK!';
  }
}
// #enddocregion

@Component({
  selector: 'hero-di-inject-additional',
  template: `<hero-title title="Tour of Heroes">
  </hero-title>`
})
class AppComponent { }

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    TitleComponent
  ],
  bootstrap: [ AppComponent ]
})
export class HeroesDIInjectAdditionalModule { }
