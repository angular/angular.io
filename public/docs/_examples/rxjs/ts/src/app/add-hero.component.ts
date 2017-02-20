// #docplaster
// #docregion
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { EventAggregatorService } from './event-aggregator.service';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  templateUrl: 'add-hero.component.html',
  styles: [ '.error { color: red }' ]
})
export class AddHeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroName', { read: ElementRef }) heroName: ElementRef;

  form: FormGroup;
  onDestroy$ = new Subject();
  showErrors: boolean = false;
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    private eventService: EventAggregatorService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required], [(control: FormControl) => {
        return this.checkHeroName(control.value);
      }]]
    });
  }

  checkHeroName(name: string) {
    return Observable.of(name)
      .switchMap(heroName => this.heroService.isNameAvailable(heroName))
      .map(available => available ? null : { taken: true });
  }

  ngAfterViewInit() {
    const controlBlur$ = Observable.fromEvent(this.heroName.nativeElement, 'blur');

    Observable.merge(
      this.form.valueChanges,
      controlBlur$
    )
    .debounceTime(300)
    .takeUntil(this.onDestroy$)
    .subscribe(() => this.checkErrors());
  }

  checkErrors() {
    if (!this.form.valid) {
      this.showErrors = true;
    }
  }

  save(model: any) {
    this.heroService.addHero(model.name)
      .subscribe(() => {
        this.success = true;
        this.eventService.add({
          type: 'hero',
          message: 'Hero Added'
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.complete();
  }
}
