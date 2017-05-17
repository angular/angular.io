// #docregion
// #docregion hero-detail
export const heroDetail = {
  template: `
    <h2>Windstorm details!</h2>
    <div><label>id: </label>1</div>
  `,
  controller: function() {
  }
};
// #enddocregion hero-detail

// #docregion hero-detail-upgrade
// #docregion hero-detail-upgrade-aot-compatible
import { Directive, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'hero-detail'
})
export class HeroDetailDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('heroDetail', elementRef, injector);
  }

  // #enddocregion hero-detail-upgrade
  // For this class to work when compiled with AoT, we must implement these lifecycle hooks
  // because the AoT compiler will not realise that the super class implements them
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) { super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
// #docregion hero-detail-upgrade
}
// #enddocregion hero-detail-upgrade
// #enddocregion hero-detail-upgrade-aot-compatible
