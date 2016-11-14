// #docplaster
// #docregion bare
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// #enddocregion bare
// #docregion upgrademodule
import { UpgradeModule } from '@angular/upgrade/static';
// #enddocregion upgrademodule
// #docregion httpmodule
import { HttpModule } from '@angular/http';
// #enddocregion httpmodule
// #docregion phonelist
import { FormsModule } from '@angular/forms';
// #enddocregion phonelist
// #docregion phone
import { Phone } from './core/phone/phone.service';
// #enddocregion phone
// #docregion checkmarkpipe
import { CheckmarkPipe } from './core/checkmark/checkmark.pipe';
// #enddocregion checkmarkpipe
// #docregion phonelist
import { PhoneListComponent } from './phone-list/phone-list.component';
// #enddocregion phonelist
// #docregion phonedetail
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
// #enddocregion phonedetail

// #docregion bare, upgrademodule, httpmodule, phone, phonelist, phonedetail, checkmarkpipe

@NgModule({
  imports: [
    BrowserModule,
    // #enddocregion bare
    UpgradeModule,
    // #enddocregion upgrademodule
    HttpModule,
    // #enddocregion httpmodule, phone
    FormsModule,
  // #docregion bare, upgrademodule, httpmodule, phone
  ],
  // #enddocregion bare, upgrademodule, httpmodule, phone
  declarations: [
    PhoneListComponent,
    // #enddocregion phonelist
    PhoneDetailComponent,
    // #enddocregion phonedetail
    CheckmarkPipe
    // #docregion phonelist, phonedetail
  ],
  entryComponents: [
    PhoneListComponent,
    // #enddocregion phonelist
    PhoneDetailComponent
    // #enddocregion phonedetail
  ],
  // #docregion phone, routeparams
  providers: [
    Phone,
    // #enddocregion phone
    {
      provide: '$routeParams',
      useFactory: routeParamsFactory,
      deps: ['$injector']
    }
    // #docregion phone
  ]
  // #enddocregion routeparams
// #docregion bare, upgrademodule, httpmodule, phone, phonelist
})
export class AppModule {
  // #enddocregion bare
  ngDoBootstrap() {}
  // #docregion bare
}
// #enddocregion bare, upgrademodule, httpmodule, phone, phonelist, phonedetail, checkmarkpipe

// #docregion routeparams
export function routeParamsFactory(i: any) {
  return i.get('$routeParams');
}
// #enddocregion routeparams
