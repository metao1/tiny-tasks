import {TinyConfig} from '@tiny/types';

export const tinyConfig: TinyConfig = {
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            background: 'mat-tiny-dark-700-bg',
            folded: false,
            hidden: false,
            position: 'left',
            variant: 'vertical-style-1'
        },
        toolbar: {
            background: 'mat-white-500-bg',
            hidden: false,
            position: 'below-static'
        },
        footer: {
            background: 'mat-tiny-dark-900-bg',
            hidden: false,
            position: 'below-fixed'
        },
        sidepanel: {
            hidden: false,
            position: 'right'
        }
    },
    customScrollbars: true
};
