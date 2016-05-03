// #docregion
import { Component } from '@angular/core';

import { EditItem } from './edit-item';
import { HeroesService } from './heroes.service';
import { HeroCardComponent } from './hero-card.component';
import { HeroEditorComponent } from './hero-editor.component';
import { Hero } from './hero';

@Component({
  selector: 'heroes-list',
  template: `
    <div>
      <ul>
        <li *ngFor="let editItem of heroes">
          <hero-card
            [hidden]="editItem.editing"
            [hero]="editItem.item">
          </hero-card>
          <button
            [hidden]="editItem.editing"
            (click)="editItem.editing = true">
              edit
          </button>
          <hero-editor
            (saved)="onSaved(editItem, $event)"
            (canceled)="onCanceled(editItem)"
            [hidden]="!editItem.editing"
            [hero]="editItem.item">
          </hero-editor>
        </li>
      </ul>
    </div>`,
  directives: [HeroCardComponent, HeroEditorComponent]
})
export class HeroesListComponent {
  heroes: Array<EditItem<Hero>>;
  constructor(heroesService: HeroesService) {
    this.heroes = heroesService.getHeroes()
                               .map(item => new EditItem(item));
  }

  onSaved (editItem: EditItem<Hero>, updatedHero: Hero) {
    editItem.item = updatedHero;
    editItem.editing = false;
  }

  onCanceled (editItem: EditItem<Hero>) {
    editItem.editing = false;
  }
}


// #enddocregion
