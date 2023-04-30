import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormLoginComponent} from "./components/modules/login/forms/form-login/form-login.component";
import {FormRegisterComponent} from "./components/modules/login/forms/form-register/form-register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./components/modules/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormLoginComponent,
    FormRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
