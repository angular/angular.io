// #docregion
import { Component }   from '@angular/core';
import { Router }      from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  private toggle = false;

  constructor(private router: Router) {  }

  pop() {
    this.toggle = !this.toggle;
    this.router.navigate(['/', {outlets: { 'popup': this.toggle ? 'about' : null }} ]);
  }
}
