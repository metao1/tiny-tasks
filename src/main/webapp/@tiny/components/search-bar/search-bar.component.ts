import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

import {TinyConfigService} from '@tiny/services/config.service';

@Component({
  selector: 'tiny-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class TinySearchBarComponent implements OnInit, OnDestroy {
  collapsed: boolean;

  @Output()
  input: EventEmitter<any>;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {TinyConfigService} _tinyConfigService
   */
  constructor(
    private _tinyConfigService: TinyConfigService
  ) {
    // Set the defaults
    this.input = new EventEmitter();
    this.collapsed = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Collapse
   */
  collapse(): void {
    this.collapsed = true;
  }

  /**
   * Expand
   */
  expand(): void {
    this.collapsed = false;
  }

  /**
   * Search
   *
   * @param event
   */
  search(event): void {
    this.input.emit(event.target.value);
  }

}
