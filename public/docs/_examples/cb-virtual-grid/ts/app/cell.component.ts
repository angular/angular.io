// #docregion
import { Component, Input, Output, EventEmitter, ElementRef, Renderer, ViewChild } from '@angular/core';

import { Column }          from './column';
import { HeroGridService } from './hero-grid.service';
import { KeyCodeService }  from './key-code.service';

@Component({
  selector: 'grid-cell',
  template: `<input #input 
                    [value]="col.cellValue"
                    [id]="id"
                    (input)="col.cellValue = $event.target.value"
                    (click)="heroGridService.selectColumn(col)" (keydown)="onKeyDown($event)" />`
})

export class CellComponent {
  @Input() col: Column;
  @Input() id: string;
  @Output() navigate = new EventEmitter();
  @ViewChild('input') input: ElementRef;

  constructor(public heroGridService: HeroGridService, private elementRef: ElementRef,
              private renderer: Renderer, private keyCodeService: KeyCodeService) {
  }

  select() {
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
  }

  onKeyDown(e: any) {
    let key = this.keyCodeService.getNavigationKey(e.keyCode);
    if (key.isArrowKey) {
      this.navigate.emit(e);
    }
    return !key.tab;
  }
}

