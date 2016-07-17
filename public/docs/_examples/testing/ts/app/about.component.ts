// #docregion
import { Component }   from '@angular/core';

@Component({
  template: `
  <h2 highlight="skyblue">About</h2>
  <twain-quote></twain-quote>
  <p>All about this sample</p>
  `,
  styleUrls: ['app/shared/styles.css']
})
export class AboutComponent { }
