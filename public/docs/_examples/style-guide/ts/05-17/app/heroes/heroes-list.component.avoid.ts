// #docregion
/* avoid */

@Component({
  selector: 'toh-heroes-list',
  template: `
    <section>
      Our list of heroes:
      <hero-profile *ngFor="#hero of heroes" [hero]="hero">
      </hero-profile>
      Total powers: {{totalPowers}}<br>
      Average power: {{totalPowers / heroes.length}}
    </section>
  `
})
export class HeroesListComponent {
  heroes: Hero[];
  totalPowers: number;
}
