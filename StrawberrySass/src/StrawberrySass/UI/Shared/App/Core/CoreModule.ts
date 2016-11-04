﻿import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [HttpModule]
})
export class CoreModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        }
    }

}