import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ValidateDirective } from './shared';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '02-08', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    ValidateDirective
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
