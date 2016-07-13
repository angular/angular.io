import { Component, OnInit } from '@angular/core';

import { Crisis,
         CrisisService }     from './crisis.service';

@Component({
  template: `
    <h3 highlight>Crisis List</h3>
    <div *ngFor='let crisis of crisises | async'>
      <a routerLink="{{crisis.id}}">{{crisis.id}} - {{crisis.name}}</a>
    </div>
  `,
  providers: [CrisisService] // SHOULD NOT BE NECESSARY
})
export class CrisisList implements OnInit {
  crisises: Promise<Crisis[]>;
  constructor(private CrisisService: CrisisService) { }

  ngOnInit() {
    this.crisises = this.CrisisService.getCrises();
  }
}
