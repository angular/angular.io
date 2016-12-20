// #docplaster
// #docregion , v3
import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeMessageComponent } from './compose-message.component';

const appRoutes: Routes = [
// #enddocregion v3
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'modal'
  }
// #docregion v3
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
