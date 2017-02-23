// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  templateUrl: './add-hero.component.html',
  styles: [ '.error { color: red }' ]
})
export class AddHeroComponent implements OnInit {
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

  save(model: any) {
    // TODO: Save hero
  }
}
