import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[tinyWidgetToggle]'
})
export class TinyWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
