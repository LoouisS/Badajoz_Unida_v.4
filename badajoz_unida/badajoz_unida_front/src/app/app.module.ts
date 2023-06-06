import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {interceptorProvider} from "./security/services/interceptors/prod-interceptor.service";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {SharedModule} from "./shared/shared.module";
import { CesionImagenComponent } from './components/modals/cesion-imagen/cesion-imagen.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [interceptorProvider],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
