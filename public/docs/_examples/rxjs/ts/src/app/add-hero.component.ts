// #docplaster
// #docregion
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  templateUrl: 'add-hero.component.html',
  styles: [ '.error { color: red }' ]
})
export class AddHeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formControls: ElementRef[];

  form: FormGroup;
  sub: Subscription;
  showErrors: boolean = false;
  submitted: boolean = false;
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  ngAfterViewInit() {
    const controlBlurs: Observable<Event>[] = this.formControls.map(field => Observable.fromEvent(field.nativeElement, 'blur'));

    this.sub = Observable.merge(
      this.form.valueChanges,
      ...controlBlurs
    )
    .debounceTime(300)
    .subscribe(() => this.checkErrors());
  }

  checkErrors() {
    if (!this.form.valid) {
      this.showErrors = true;
    }
  }

  save(model: any) {
    this.success = false;
    this.submitted = true;

    this.heroService.addHero(model)
      .do(() => {
        this.success = true;
        this.submitted = false;
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
