import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: 'app/hero/hero-detail.component.html',
  styleUrls:  ['app/hero/hero-detail.component.css'],
  inputs:     ['hero']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    // tslint:disable-next-line:triple-equals
    if (id == undefined) {
      // no id; act as if is new
      this.hero = {id: 0, name: ''};
    } else {
      this.heroService.getHero(id).then(hero => {
        if (hero) {
          this.hero = hero;
        } else {
          this.gotoList(); // id not found; navigate to list
        }
      });
    }
  }

  gotoList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
