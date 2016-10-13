import {
  Component,
  ViewChildren,
  ContentChild,
  QueryList,
  Input,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

class ActiveLabelComponent {
  activate() {
    this.active = true;
  }
}

ActiveLabelComponent.annotations = [
  new Component({
    selector: 'active-label',
    template: `
    <span class="active-label" *ngIf="active">
      Active
    </span>`
  })
];

// #docregion content
class HeroComponent {
  activate() {
    this.active = true;
    this.label.activate();
  }
}

HeroComponent.annotations = [
  new Component({
    selector: 'a-hero',
    template: `<h2 [class.active]=active>
      {{hero.name}}
      <ng-content></ng-content>
    </h2>`,
    inputs: ['hero'],
    queries: {
      label: new ContentChild(ActiveLabelComponent)
    }
  })
];
// #enddocregion content


// #docregion view
class HeroesQueriesComponent {
  constructor(){
    this.heroData = [
      {id: 1, name: 'Windstorm'},
      {id: 2, name: 'Superman'}
    ];
  }

  activate() {
    this.heroCmps.forEach(
      (cmp) => cmp.activate()
    );
  }
}

HeroesQueriesComponent.annotations = [
  new Component({
    selector: 'heroes-queries',
    template: `
      <a-hero *ngFor="let hero of heroData"
            [hero]="hero">
        <active-label></active-label>
      </a-hero>
      <button (click)="activate()">
        Activate
      </button>
    `,
    queries: {
      heroCmps: new ViewChildren(HeroComponent)
    }
  })
];
// #enddocregion view

export class HeroesQueriesModule { }

HeroesQueriesModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    declarations: [
      HeroesQueriesComponent,
      HeroComponent,
      ActiveLabelComponent
    ],
    bootstrap: [ HeroesQueriesComponent ]
  })
];
