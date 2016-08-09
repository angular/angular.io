import {
  Attribute,
  Component,
  ElementRef,
  Inject,
  Optional,
  Query,
  QueryList,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
@Component({
  selector: 'hero-title',
  template: `
    <h1>{{titlePrefix}} {{title}}</h1>
    <button (click)="ok()">OK</button>
    <ng-content></ng-content>
  `
})
class TitleComponent {
  constructor(
    @Inject('titlePrefix')
    @Optional()
      private titlePrefix: string,
    @Attribute('title')
      private title: string,
    @Query('okMsg')
      private msg: QueryList<ElementRef>) {
  }

  ok() {
    let msgEl =
      this.msg.first.nativeElement;
    msgEl.textContent = 'OK!';
  }
}
// #enddocregion

@Component({
  selector: 'hero-di-inject-additional',
  template: `<hero-title title="Tour of Heroes">
    <span #okMsg class="ok-msg"></span>
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
