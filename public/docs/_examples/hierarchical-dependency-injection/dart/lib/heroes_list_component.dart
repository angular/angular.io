// #docregion
import 'package:angular2/core.dart';

import 'edit_item.dart';
import 'hero.dart';
import 'hero_card_component.dart';
import 'hero_editor_component.dart';
import 'heroes_service.dart';

@Component(
    selector: 'heroes-list',
    template: '''
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
            (saved)="onSaved(editItem, \$event)"
            (canceled)="onCanceled(editItem)"
            [hidden]="!editItem.editing"
            [hero]="editItem.item">
          </hero-editor>
        </li>
      </ul>
    </div>
  ''',
    directives: const [HeroCardComponent, HeroEditorComponent])
class HeroesListComponent {
  List<EditItem<Hero>> heroes;
  HeroesListComponent(HeroesService heroesService) {
    heroes = heroesService
        .getHeroes()
        .map((Hero item) => new EditItem(item))
        .toList();
  }

  onCanceled(EditItem<Hero> editItem) {
    editItem.editing = false;
  }

  onSaved(EditItem<Hero> editItem, Hero updatedHero) {
    editItem.item = updatedHero;
    editItem.editing = false;
  }
}
// #enddocregion
