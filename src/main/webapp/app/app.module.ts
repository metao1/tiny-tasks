import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import 'hammerjs';

import {TinyModule} from '@tiny/tiny.module';
import {TinySharedModule} from '@tiny/shared.module';
import {TinyPanelModule} from '@tiny/components';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {NgxWebstorageModule} from "ngx-webstorage";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {ContentModule} from "./layout/components/content/content.module";
import {QuickPanelModule} from "./layout/components/quick-panel/quick-panel.module";
import {tinyConfig} from "app/tiny-config";

const appRoutes: Routes = [
  {
    path: 'apps',
    loadChildren: 'app/main/apps/apps.module#AppsModule'
  },
  {
    path: '**',
    redirectTo: 'apps'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxWebstorageModule.forRoot({prefix: 'tiny', separator: '-'}),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    // Tiny modules
    TinyModule.forRoot(tinyConfig),
    TinySharedModule,
    TinyPanelModule,
    NgbModule,
    // App modules
    LayoutModule,
    RouterModule,

    TinySharedModule,

    ContentModule,
    QuickPanelModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule {
}
