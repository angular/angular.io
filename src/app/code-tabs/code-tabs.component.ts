import {Component, OnInit, ElementRef, ComponentFactoryResolver} from '@angular/core';

// index.html includes prettify.js from the vendor folder.
declare var prettyPrint;

@Component({
  selector: 'code-tabs',
  templateUrl: 'code-tabs.component.html',
})
export class CodeTabsComponent implements OnInit {
  panes: any;
  
  constructor(
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    
    // Place code-panes in the DOM, so that we can select them.
    this.elementRef.nativeElement.innerHTML = this.elementRef.nativeElement.codeTabsContent;
    this.panes = [].slice.call(this.elementRef.nativeElement.getElementsByTagName('code-pane'));
    this.panes.forEach((p, i) => {
      if (i === 0) { // first pane is the first one active
        p.active = true
      }
      p.language = p.getAttribute('language');
      p.format = p.getAttribute('format');
      p.name = p.getAttribute('name');
    });
  
    // Remove the code-panes from DOM, and let this component's template take over.
    this.elementRef.nativeElement.innerHTML = ""; //
  }
  
  ngOnInit() {
  }

  selectPane(pane) {
    this.panes.forEach((pane) => {
      pane.active = false;
    });
    pane.active = true;
  }
}
