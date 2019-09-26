import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TinyMatchMediaService
{
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /**
     * Constructor
     *
     * @param {MediaObserver} _MediaObserver
     */
    constructor(
        private _MediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.activeMediaQuery = '';

        // Initialize
        this._init();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void
    {
        this._MediaObserver.media$.subscribe((change: MediaChange) => {
                if ( this.activeMediaQuery !== change.mqAlias )
                {
                    this.activeMediaQuery = change.mqAlias;
                    this.onMediaChange.next(change.mqAlias);
                }
            });
    }

}
