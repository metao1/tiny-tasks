import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TinyPanelModule } from '@tiny/components';
import { TinySharedModule } from '@tiny/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';

import { VerticalLayout1Component } from 'app/layout/vertical/layout-1/layout-1.component';

@NgModule({
    declarations: [
        VerticalLayout1Component
    ],
    imports     : [
        RouterModule,

        TinySharedModule,
        TinyPanelModule,

        ContentModule,
        QuickPanelModule,
    ],
    exports     : [
        VerticalLayout1Component
    ]
})
export class VerticalLayout1Module
{
}
