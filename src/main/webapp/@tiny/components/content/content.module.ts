import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ContentComponent} from "./content.component";
import {TinySharedModule} from "../../shared.module";


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
