// #docplaster
// #docregion bare
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// #enddocregion bare
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

// #docregion bare, httpmodule, phone, phonelist, phonedetail, checkmarkpipe

@NgModule({
  imports: [
    BrowserModule,
    // #enddocregion bare
    HttpModule,
    // #enddocregion httpmodule, phone
    FormsModule,
  // #docregion bare, httpmodule, phone
  ],
  // #enddocregion bare, httpmodule, phone
  declarations: [
    PhoneListComponent,
    // #enddocregion phonelist
    PhoneDetailComponent,
    // #enddocregion phonedetail
    CheckmarkPipe
    // #docregion phonelist, phonedetail
  ],
  // #docregion phone
  providers: [ Phone ]
// #docregion bare, httpmodule, phonelist
})
export class AppModule {}
// #enddocregion httpmodule, phone, phonelist, phonedetail, checkmarkpipe
// #enddocregion bare
