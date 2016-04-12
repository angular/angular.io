// #docregion
// #docregion silent-navigation
import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'restricted',
  template: `
    <h3>Restricted Content</h3>

    <div *ngIf="authorized">Here is some protected content</div>
  `
})
export class RestrictedComponent implements OnInit {
  authorized: boolean = false;
  constructor(private _router: Router) {}

  ngOnInit() {
    if (!this.authorized) {
      // #docregion silent-navigation
      let unauthorizedInstruction = this._router.generate(['/Unauthorized']);

      this._router.navigateByInstruction(unauthorizedInstruction, true);
      // #enddocregion silent-navigation
    }
  }
}
// #enddocregion silent-navigation
