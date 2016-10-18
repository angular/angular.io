// #docregion
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  template:  `
    <h3>CRISIS ADMINISTRATION</h3>
    <p>Manage your crises here</p>

    <p>Session ID: {{ sessionId | async }}</p>
    <a id="anchor"></a>
    <p>Token: {{ token | async }}</p>
  `,
  directives: []
})
export class CrisisAdminComponent implements OnInit {
  sessionId: Observable<string>;
  token: Observable<string>;

  constructor(private router: Router) {}

  ngOnInit() {
    // Capture the session ID if available
    this.sessionId = this.router
      .routerState
      .queryParams
      .map(params => params['session_id'] || 'None');

    // Capture the fragment if available
    this.token = this.router
      .routerState
      .fragment
      .map(fragment => fragment || 'None');
  }
}
