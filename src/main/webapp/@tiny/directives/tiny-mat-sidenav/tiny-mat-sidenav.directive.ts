import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TinyMatchMediaService } from '@tiny/services/match-media.service';
import { tinyMatSideHelperService } from '@tiny/directives/tiny-mat-sidenav/tiny-mat-sidenav.service';

@Directive({
    selector: '[tinyMatSideHelper]'
})
export class TinyMatSideHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input('tinyMatSideHelper')
    id: string;

    @Input('mat-is-locked-open')
    matIsLockedOpenBreakpoint: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {TinyMatchMediaService} tinyMatchMediaService
     * @param {tinyMatSideHelperService} tinyMatSideHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _MediaObserver
     */
    constructor(
        private tinyMatchMediaService: TinyMatchMediaService,
        private tinyMatSideHelperService: tinyMatSideHelperService,
        private _matSidenav: MatSidenav,
        private _MediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Register the sidenav to the service
        this.tinyMatSideHelperService.setSidenav(this.id, this._matSidenav);

        if ( this._MediaObserver.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this.tinyMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this._MediaObserver.isActive(this.matIsLockedOpenBreakpoint) )
                {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[tinyMatSideToggler]'
})
export class TinyMatSideTogglerDirective
{
    @Input('tinyMatSideToggler')
    id;

    /**
     * Constructor
     *
     * @param {tinyMatSideHelperService} tinyMatSideHelperService
     */
    constructor(
        private tinyMatSideHelperService: tinyMatSideHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick()
    {
        this.tinyMatSideHelperService.getSidenav(this.id).toggle();
    }
}
