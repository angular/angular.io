// #docregion
import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'cb-assignment',
  templateUrl: 'app/hero-assignment.component.html'
})
export class HeroAssignmentComponent implements AfterViewInit {
  @Input() title: string;
  @ViewChild('assignment') assignment: ElementRef;

  assignedHeroes: string[] = [];

  // #docregion add-plugin
  ngAfterViewInit(): void {
    jQuery(this.assignment.nativeElement).droppable({drop : (event: any, ui: any) => {
      let heroName = ui.draggable.data('hero');
      if (this.assignedHeroes.indexOf(heroName) === -1) {
        this.assignedHeroes = [...this.assignedHeroes, heroName];
      }
    }});
  }
  // #enddocregion add-plugin
}
