import { Component, ComponentRef, DoCheck, ElementRef, Injector, ComponentFactory, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ApiListComponent } from './api-list/api-list.component';
import { CodeExampleComponent } from './code-example/code-example.component';
import { CodeTabsComponent } from './code-tabs/code-tabs.component';
import { LiveExampleComponent } from './live-example/live-example.component';
import { NgioCheatsheetComponent } from './ngio-cheatsheet/ngio-cheatsheet.component';

interface NgioComp {
  selector: string,   // e.g., 'live-example'
  componentType: any, // e.g., LiveExample
  contentPropertyName?: string, // computed in viewer constructor; e.g., liveExampleContent
}

const ngioComp: [NgioComp] = [
  { selector: 'api-list', componentType: ApiListComponent },
  { selector: 'code-example', componentType: CodeExampleComponent },
  { selector: 'code-tabs', componentType: CodeTabsComponent },
  { selector: 'live-example', componentType: LiveExampleComponent },
  { selector: 'ngio-cheatsheet', componentType: NgioCheatsheetComponent },
  // TODO: don't forget to add each component in entryComponents.
];

@Component({
  selector: 'app-root',
  template: '',
  entryComponents: [
    ApiListComponent,
    CodeExampleComponent,
    CodeTabsComponent,
    LiveExampleComponent,
    NgioCheatsheetComponent,
  ],
})
export class AppComponent implements DoCheck, OnDestroy {
  private pageComponents: ComponentRef<any>[] = [];
  private componentFactory: Map<string, ComponentFactory<any>> = new Map();

  constructor(
    el: ElementRef,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    // this.componentFactory = componentFactoryResolver.resolveComponentFactory(MyEltComponent);
    for (let elt of ngioComp) {
      const factory = componentFactoryResolver.resolveComponentFactory(elt.componentType);
      this.componentFactory.set(elt.selector, factory);
      // Compute the elt content property name by converting the selector
      // to lower CamelCase and appending 'Content'; e.g. liveExampleContent
      elt.contentPropertyName = `${elt.selector.replace(/-(.)/g, (match, $1) => $1.toUpperCase())}Content`;
    }

    const body = el.nativeElement.parentNode; // console.log(`body: ${body.innerHTML}`);

    ngioComp.forEach(({ selector, componentType, contentPropertyName}) => {
      // find all ng elements in body
      const ngCompElts = body.querySelectorAll(selector);
      ngCompElts.forEach((elt) => {
        // hack: preserve the current element content because the factory will empty it out
        elt[contentPropertyName] = elt.innerHTML;
        // instantiate and load the component
        const factory = this.componentFactory.get(selector);
        this.pageComponents.push(factory.create(injector, [], elt));
      });
    });
  }

  ngDoCheck() {
    this.pageComponents.forEach(comp => comp.changeDetectorRef.detectChanges());
  }

  ngOnDestroy() {
    // destroy components otherwise there will be memory leaks
    this.pageComponents.forEach(comp => comp.destroy());
    this.pageComponents.length = 0;
  }
}
