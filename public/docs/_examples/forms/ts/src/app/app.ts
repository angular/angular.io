// #docregion
import {Component} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import {HeroFormComponent} from './hero-form.component'

@Component({
  selector: 'my-app',
  template: '<hero-form></hero-form>',
  directives: [HeroFormComponent]
})
class AppComponent { }

bootstrap(AppComponent);