import { Component, OnInit, AfterViewInit } from '@angular/core';
const Clipboard = require('clipboard');

@Component({
  selector: 'copy-container',
  templateUrl: 'copy-container.component.html'
})
export class CopyContainer implements OnInit, AfterViewInit {
  isCopied: boolean = false;
  
  constructor () {
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    const clipboard = new Clipboard(document.getElementsByClassName('js-copy-button'), {
      target: (trigger) => {
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 1000);
        return trigger.nextElementSibling;
      }
    });
  }
}
