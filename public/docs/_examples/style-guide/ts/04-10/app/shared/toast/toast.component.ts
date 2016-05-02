import { Component, OnInit } from '@angular/core';

import { ToastService } from './toast.service';

@Component({
  moduleId: __moduleName,
  selector: 'toh-toast',
  templateUrl: '<div>toast</div>'
})
export class ToastComponent implements OnInit {
  constructor(toastService: ToastService) { }

  ngOnInit() { }
}
