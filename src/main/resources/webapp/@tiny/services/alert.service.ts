import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
    providedIn: 'root'
})
export class TinyAlertService {

    constructor(private snackBar: MatSnackBar) {
    }

    /**
     * Create alert for different components
     */
    openSnackBar = function (full: string, full2: string) {
        this.snackBar.open(full, full2, {
            duration: 5000,
        });
    }
}
