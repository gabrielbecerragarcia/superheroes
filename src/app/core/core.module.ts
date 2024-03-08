import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

@NgModule({
    declarations: [
      DefaultLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        HttpClientModule,
        DefaultLayoutComponent
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error('CoreModule has already been loaded. Import CoreModule modules in the AppModule only.');
      }
    }
}
