// #docregion
/**
 * AVOID THIS PATTERN
 */

/*
* HeroComponent is in the Tour of Heroes feature
*/
@Component({
  selector: 'hero'
})
export class HeroComponent {}

/*
* UsersComponent is in an Admin feature
*/
@Component({
  selector: 'users'
})
export class UsersComponent {}
