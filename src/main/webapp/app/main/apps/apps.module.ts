import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TinySharedModule} from '@tiny/shared.module';
import {TinyAlertService} from "@tiny/services/alert.service";
import {EventManager} from "@tiny/event/EventManager";

const routes = [
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoModule'
  }, {
    path: '**',
    redirectTo: 'todo'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TinySharedModule
  ],
  providers: [
    EventManager,
    TinyAlertService
  ]
})
export class AppsModule {
}
