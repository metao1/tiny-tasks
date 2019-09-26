import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {TINY_CONFIG} from "./services/config.service";

@NgModule()
export class TinyModule {
  constructor(@Optional() @SkipSelf() parentModule: TinyModule) {
    if (parentModule) {
      throw new Error('TinySnackBarModule is already loaded. Import it in the AppModule only!');
    }
  }
  static forRoot(config): ModuleWithProviders
  {
    return {
      ngModule : TinyModule,
      providers: [
        {
          provide : TINY_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
