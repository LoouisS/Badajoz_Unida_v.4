import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormLoginRoutingModule } from './form-login-routing.module';
import { FormLoginComponent } from './form-login/form-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormLoginComponent
  ],
  imports: [
    CommonModule,
    FormLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormLoginModule { }
