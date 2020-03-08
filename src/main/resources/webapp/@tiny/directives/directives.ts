import {NgModule} from '@angular/core';

import {TinyInnerScrollDirective} from '@tiny/directives/tiny-inner-scroll/tiny-inner-scroll.directive';
import {TinyPerfectScrollbarDirective} from '@tiny/directives/tiny-perfect-scrollbar/tiny-perfect-scrollbar.directive';
import {
    TinyMatSideHelperDirective,
    TinyMatSideTogglerDirective
} from '@tiny/directives/tiny-mat-sidenav/tiny-mat-sidenav.directive';

@NgModule({
    declarations: [
        TinyInnerScrollDirective,
        TinyMatSideHelperDirective,
        TinyMatSideTogglerDirective,
        TinyPerfectScrollbarDirective
    ],
    imports: [],
    exports: [
        TinyInnerScrollDirective,
        TinyMatSideHelperDirective,
        TinyMatSideTogglerDirective,
        TinyPerfectScrollbarDirective
    ]
})
export class TinyDirectivesModule {
}
