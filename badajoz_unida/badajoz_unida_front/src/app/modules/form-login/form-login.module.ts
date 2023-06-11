import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormLoginRoutingModule } from './form-login-routing.module';
import { FormLoginComponent } from './form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    FormLoginComponent
  ],
  imports: [
    CommonModule,
    FormLoginRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FormLoginModule { }
