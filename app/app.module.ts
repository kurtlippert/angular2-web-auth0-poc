import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';
import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { PotatoesComponent }   from './potatoes.component';
import { DetailsComponent }    from './details.component';
import { routing,
         appRoutingProviders } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PotatoesComponent,
        DetailsComponent
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS
    ],
    imports:      [
        BrowserModule,
        routing
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
