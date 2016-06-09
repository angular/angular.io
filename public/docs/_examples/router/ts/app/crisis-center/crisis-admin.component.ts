// #docregion
import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  template:  `
    <h3>CRISIS ADMINISTRATION</h3>
    <p>Manage your crises here</p>
  `,
  directives: [ROUTER_DIRECTIVES]
})

export class CrisisAdminComponent { }
