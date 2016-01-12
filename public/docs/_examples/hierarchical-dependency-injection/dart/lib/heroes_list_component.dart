// #docregion
import 'package:angular2/angular2.dart';
import 'package:hierarchical_di/hero.dart';
import 'package:hierarchical_di/heroes_service.dart';
import 'package:hierarchical_di/hero_editor_component.dart';
import 'package:hierarchical_di/hero_card_component.dart';
import 'package:hierarchical_di/edit_item.dart';

@Component(
    selector: 'heroes-list',
    template: '''
  <div>
      <ul>
        <li *ngFor="#editItem of heroes">
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

  onSaved(EditItem<Hero> editItem, Hero updatedHero) {
    editItem.item = updatedHero;
    editItem.editing = false;
  }

  onCanceled(EditItem<Hero> editItem) {
    editItem.editing = false;
  }
}
// #enddocregion
