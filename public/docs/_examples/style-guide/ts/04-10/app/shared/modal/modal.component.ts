import { Component, OnInit } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  moduleId: __moduleName,
  selector: 'toh-modal-confirm',
  template: '<div>modal</div>'
})
export class ModalComponent implements OnInit {
  constructor(modalService: ModalService) { }

  ngOnInit() { }
}
