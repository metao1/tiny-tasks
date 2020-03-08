import {NgModule} from '@angular/core';
import {MatSnackBarModule} from "@angular/material";
import {TinySnackbarComponent} from "./tiny-snackbar.component";

@NgModule({
    declarations: [
        TinySnackbarComponent
    ],
    imports: [
        MatSnackBarModule
    ],
    exports: [
        TinySnackbarComponent
    ]
})
export class TinySnackBarModule {
}
