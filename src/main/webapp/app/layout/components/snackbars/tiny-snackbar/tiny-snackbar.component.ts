import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'tiny-snackbar',
    templateUrl: './tiny-snackbar.component.html',
    styleUrls: ['./tiny-snackbar.component.scss']
})
export class TinySnackbarComponent implements OnInit, OnDestroy {

    constructor(public matSnackBar: MatSnackBar) {
    }

    public openSnackBar(message: string, action: string, d: number) {
        this.matSnackBar.openFromComponent(TinySnackbarComponent, {
            data: message,
            duration: d
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

}
