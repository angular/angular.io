import { Component, OnInit } from 'angular2/core';

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
