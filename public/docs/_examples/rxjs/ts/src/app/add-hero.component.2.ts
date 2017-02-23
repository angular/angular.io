// #docplaster
// #docregion
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/merge';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  templateUrl: './add-hero.component.html',
  styles: [ '.error { color: red }' ]
})
export class AddHeroComponent implements OnInit, OnDestroy {
  form: FormGroup;
  showErrors: boolean = false;
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  save(model: Hero) {
    this.heroService.addHero(model.name)
      .subscribe(() => {
        this.success = true;
      });
  }
}
