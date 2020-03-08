import {NgModule} from '@angular/core';

import {TinyWidgetComponent} from './widget.component';
import {TinyWidgetToggleDirective} from './widget-toggle.directive';

@NgModule({
    declarations: [
        TinyWidgetComponent,
        TinyWidgetToggleDirective
    ],
    exports: [
        TinyWidgetComponent,
        TinyWidgetToggleDirective
    ],
})
export class TinyWidgetModule {
}
