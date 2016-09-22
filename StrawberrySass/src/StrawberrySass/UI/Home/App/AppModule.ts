﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MdButtonModule } from '@angular2-material/button';
import { MdCoreModule } from '@angular2-material/core';
import { MdIconModule } from '@angular2-material/icon';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { LayoutComponent } from '../../Shared/Layout';

import { AboutComponent } from './AboutComponent';
import { routing } from './AppRouting';
import { ContactUsComponent } from './ContactUsComponent';
import { WelcomeComponent } from './WelcomeComponent';

@NgModule({
    imports: [
        BrowserModule,

        MdButtonModule.forRoot(),
        MdCoreModule.forRoot(),
        MdIconModule.forRoot(),
        MdSidenavModule.forRoot(),
        MdToolbarModule.forRoot(),

        routing
    ],
    declarations: [
        LayoutComponent,

        AboutComponent,
        ContactUsComponent,
        WelcomeComponent
    ],
    bootstrap: [LayoutComponent]
})
export class AppModule { }