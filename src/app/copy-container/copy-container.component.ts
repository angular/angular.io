import { Component, AfterViewInit } from '@angular/core';

// clipboard.min.js from the vendor folder.
declare var Clipboard;

@Component({
  selector: 'copy-container',
  templateUrl: 'copy-container.component.html'
})
export class CopyContainerComponent implements AfterViewInit {
  isCopied: boolean = false;
  
  constructor () { }
  
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
