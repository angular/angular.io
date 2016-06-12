import {
  Component,
  ViewChildren,
  ContentChild,
  QueryList,
  Input
} from '@angular/core';

@Component({
  selector: 'active-label',
  template: `<span class="active-label"
                   *ngIf="active">
    Active
  </span>`
})
class ActiveLabelComponent {
  active: boolean;

  activate() {
    this.active = true;
  }
}

// #docregion content
@Component({
  selector: 'a-hero',
  template: `<h2 [class.active]=active>
    {{hero.name}}
    <ng-content></ng-content>
  </h2>`
})
class HeroComponent {
  @Input() hero: any;
  active: boolean;

  @ContentChild(ActiveLabelComponent)
  label: ActiveLabelComponent;

  activate() {
    this.active = true;
    this.label.activate();
  }
}
// #enddocregion content


// #docregion view
@Component({
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
  directives: [
    HeroComponent,
    ActiveLabelComponent
  ]
})
export class HeroesQueriesComponent {
  heroData = [
    {id: 1, name: 'Windstorm'},
    {id: 2, name: 'Superman'}
  ];

  @ViewChildren(HeroComponent)
  heroCmps: QueryList<HeroComponent>;

  activate() {
    this.heroCmps.forEach(
      (cmp) => cmp.activate()
    );
  }
}
// #enddocregion view
