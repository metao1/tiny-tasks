import {NgModule} from '@angular/core';
import {TinySidebarComponent} from "./sidebar.component";

@NgModule({
  declarations: [
    TinySidebarComponent
  ],
  exports: [
    TinySidebarComponent
  ]
})
export class TinyPanelModule {
}
