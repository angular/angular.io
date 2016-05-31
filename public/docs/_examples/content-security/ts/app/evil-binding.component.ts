// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'evil-binding',
  templateUrl: 'evil-binding.component.html'
})

export class EvilBindingComponent {
  // #docregion evil-title
  evilTitle = 'Template <script>alert("Evil never sleeps")</script>Syntax';
  // #enddocregion evil-title
}
