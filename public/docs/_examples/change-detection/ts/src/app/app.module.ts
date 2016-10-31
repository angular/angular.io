import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeroCounterComponent } from './hero-counter.component';
import { HeroNameBadgeBrokenComponent } from './hero-name-badge.broken.component';
import { HeroNameBadgeComponent } from './hero-name-badge.component';
import { SearchResultComponent } from './onpush/search-result.component';
import { HeroListComponent as HeroListOnpushComponent } from './onpush/hero-list.onpush.component';
import { HeroManagerMutableComponent } from './onpush/hero-manager.mutable.component';
import { HeroManagerImmutableComponent } from './onpush/hero-manager.immutable.component';
import { HeroCounterComponent as HeroCounterOnPushComponent } from './onpush/hero-counter.onpush.component';
import { HeroCounterAutoComponent } from './onpush/hero-counter-auto.component';
import { HeroCounterAutoComponent as HeroCounterAutoBrokenComponent } from './onpush/hero-counter-auto.broken.component';
import { HeroNameBadgeComponent as HeroNameBadgeEventedComponent } from './onpush/hero-name-badge-evented.component';
import { HeroNameBadgeComponent as HeroNameBadgeDetachedComponent } from './detach/hero-name-badge-detached.component';
import { HeroCounterComponent as HeroCounterLiveComponent } from './detach/hero-counter-live.component';
import { HeroCounterComponent as HeroCounterThrottledComponent } from './detach/hero-counter-throttled.component';
import { HeroSignatureFormComponent } from './detach/hero-signature-form.component';
import { AsyncWorkflowComponent } from './async-workflow.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroCounterComponent,
    HeroNameBadgeBrokenComponent,
    HeroNameBadgeComponent,
    SearchResultComponent,
    HeroListOnpushComponent,
    HeroManagerMutableComponent,
    HeroManagerImmutableComponent,
    HeroCounterOnPushComponent,
    HeroCounterAutoBrokenComponent,
    HeroCounterAutoComponent,
    HeroNameBadgeEventedComponent,
    HeroNameBadgeDetachedComponent,
    HeroCounterLiveComponent,
    HeroCounterThrottledComponent,
    HeroSignatureFormComponent,
    AsyncWorkflowComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
