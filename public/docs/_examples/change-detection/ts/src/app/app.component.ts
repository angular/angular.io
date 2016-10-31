import { Component } from '@angular/core';
import { Hero } from './hero.model';
import { HeroModel } from './onpush/hero-evented.model';

@Component({
  moduleId: module.id,
  selector: 'hero-app',
  template: `
    <h1>Angular Change Detection</h1>


    <h2>Basic Example</h2>
    <hero-counter>
    </hero-counter>

    <h2>Single-Pass</h2>

    <h3>Broken Example</h3>
    <hero-name-badge-broken [hero]="anonymousHero">
    </hero-name-badge-broken>

    <h3>Fixed Example</h3>
    <hero-name-badge [hero]="secondAnonymousHero">
    </hero-name-badge>


    <h2>OnPush</h2>

    <h3>Immutable Primitive Values</h3>
    <p>OnPush only runs detection when inputs change.</p>
    <hero-search-result [searchResult]="'Windstorm'" [searchTerm]="'indsto'">
    </hero-search-result>


    <h3>Mutable Collection, Broken Example</h3>
    <p>OnPush does not detect changes inside array inputs.</p>
    <hero-manager-mutable>
    </hero-manager-mutable>

    <h3>Immutable Collection, Fixed Example</h3>
    <p>OnPush detects changes for array inputs as longs as they're treated as immutable values.</p>
    <hero-manager-immutable>
    </hero-manager-immutable>

    <h3>Events</h3>
    <p>OnPush detects changes when they originate in an event handler.</p>
    <hero-counter-onpush>
    </hero-counter-onpush>


    <h3>Explicit Change Marking, Broken Without</h3>
    <p>A counter incrementing with setTimeout() inside an OnPush component does not update.</p>
    <hero-counter-auto-broken>
    </hero-counter-auto-broken>

    <h3>Explicit Change Marking</h3>
    <p>This is fixed using markForCheck()</p>
    <hero-counter-auto>
    </hero-counter-auto>

    <h3>Explicit Change Marking with Library Callback</h3>
    <hero-name-badge-evented [hero]="heroModel">
    </hero-name-badge-evented>
    <button (click)="renameHeroModel()">Rename</button>


    <h2>Detaching</h2>

    <h3>Permanently, "One-Time Binding"</h3>
    <p>By detaching a component's change detector at ngOnInit() we can do "one-time binding".</p>
    <hero-name-badge-detached [hero]="hero">
    </hero-name-badge-detached>
    <button (click)="renameHero()">Rename detached</button>

    <h3>Temporarily, reattach</h3>
    <p>By detaching/reattaching a change detector we can toggle whether a component has "live updates".</p>
    <hero-counter-live>
    </hero-counter-live>

    <h3>Throttling with Internal detectChanges</h3>
    <p>
      By calling detectChanges() on a detached change detector we can choose when change detection is done.
      This can be used to update the view at a lower frequency than data changes.
    </p>
    <hero-counter-throttled>
    </hero-counter-throttled>

    <h3>Flushing to DOM with Internal detectChanges</h3>
    <p>We can use detectChanges() to flush changes to the view immediately if we can't wait for the next turn of the zone.</p>
    <hero-signature-form>
    </hero-signature-form>

    <h2>Escaping NgZone For Async Work</h2>

    <h3>Without</h3>
    <p>Many unnecessary change detections will be performed for this workflow because it is all inside NgZone.</p>
    <hero-async-workflow></hero-async-workflow>
  `
})
export class AppComponent {
  hero: Hero = {name: 'Windstorm', onDuty: true};
  anonymousHero: Hero = {name: '', onDuty: false};
  secondAnonymousHero: Hero = {name: '', onDuty: false};

  heroModel = new HeroModel('Windstorm');

  renameHero() {
    this.hero.name = 'Magneta';
  }

  renameHeroModel() {
    this.heroModel.setName('Magneta');
  }

}
