import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';

import {TinyDirectivesModule} from '@tiny/directives/directives';
import {TinyPipesModule} from '@tiny/pipes/pipes.module';
import {MatSnackBarModule} from "@angular/material";
import {InputDateModule} from '@tiny/components/date/inoput-date.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        FlexLayoutModule,
        InputDateModule,
        TinyDirectivesModule,
        TinyPipesModule
    ],
    exports  : [
        InputDateModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TinyDirectivesModule,
        TinyPipesModule,
    ]
})
export class TinySharedModule
{
}
