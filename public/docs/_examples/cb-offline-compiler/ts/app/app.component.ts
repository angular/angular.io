// #docregion
import { Component, OnInit }    from '@angular/core';
import { NgFor, NgIf }  from '@angular/common';

import { ValueService } from './value.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  directives: [NgFor, NgIf],
  providers: [ValueService]
})
export class AppComponent implements OnInit {
  values: number[];
  constructor(private valueService: ValueService) {
  }

  ngOnInit() {
    this.values = this.valueService.getValues();
  }
}
