// #docregion import
import { Component } from '@angular/core';
// #enddocregion import

// #docregion metadata
@Component({
  moduleId: module.id,
  selector: 'cli-quickstart-app',
  templateUrl: 'cli-quickstart.component.html',
  styleUrls: ['cli-quickstart.component.css']
})
// #enddocregion metadata
// #docregion title, class
export class CliQuickstartAppComponent {
  title = 'My First Angular 2 App';
}
// #enddocregion title, class
