import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { A11yHelperService } from './services/a11y-helper.service';

@Component({
  selector: 'a11y-app',
  templateUrl: 'app/app.component.html',
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    A11yHelperService
  ]
})
export class AppComponent {
}
