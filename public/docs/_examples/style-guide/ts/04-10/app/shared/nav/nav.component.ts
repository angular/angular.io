import { Component, OnInit } from '@angular/core';

import { ModalService } from '../';

@Component({
  moduleId: __moduleName,
  selector: 'toh-nav',
  template: '<div>nav</div>'
})
export class NavComponent implements OnInit {

  ngOnInit() { }

  constructor(private modalService: ModalService) { }

  resetDb() { }
}
