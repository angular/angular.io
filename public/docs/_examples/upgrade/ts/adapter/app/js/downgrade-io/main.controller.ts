import {Hero} from '../Hero';

export class MainController {
  hero = new Hero(1, 'Windstorm');
  heroes = [
    new Hero(2, 'Superman'),
    new Hero(3, 'Spiderman')
  ]
  onDelete(hero:Hero) {
    console.log('del', hero);
  }
}
