import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatButtonModule, MatIconModule} from '@angular/material';

import {TinySearchBarComponent} from './search-bar.component';

@NgModule({
  declarations: [
    TinySearchBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule
  ],
  exports: [
    TinySearchBarComponent
  ]
})
export class TinySearchBarModule {
}
