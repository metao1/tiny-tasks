import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TinySharedModule } from '@tiny/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        TinySharedModule,
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule
{
}
