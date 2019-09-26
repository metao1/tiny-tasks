import {NgModule} from '@angular/core';
import {InputDateComponent} from "./input-date.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "@tiny/material.module";

@NgModule({
    imports:[
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        InputDateComponent
    ],
    exports: [
        InputDateComponent
    ]
})
export class InputDateModule {
}
