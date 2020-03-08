import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TinyConfigService} from '@tiny/services/config.service';
import {TinySidebarService} from '@tiny/components/sidebar/sidebar.service';
import {TinySplashScreenService} from '@tiny/services/splash-screen.service';

import {navigation} from 'app/navigation/navigation';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  tinyConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DOCUMENT} document
   * @param {TinyConfigService} tinyConfigService
   * @param {TinySidebarService} tinySidebarService
   * @param {TinySplashScreenService} tinySplashScreenService
   * @param {Platform} platform
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private tinyConfigService: TinyConfigService,
    private tinySidebarService: TinySidebarService,
    private tinySplashScreenService: TinySplashScreenService,
    private platform: Platform
  ) {
    // Get default navigation
    this.navigation = navigation;

    // Add is-mobile class to the body if the platform is mobile
    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

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
    // Subscribe to config changes
    this.tinyConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.tinyConfig = config;

        if (this.tinyConfig.layout.height === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }
      });
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
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this.tinySidebarService.getSidebar(key).toggleOpen();
  }
}
