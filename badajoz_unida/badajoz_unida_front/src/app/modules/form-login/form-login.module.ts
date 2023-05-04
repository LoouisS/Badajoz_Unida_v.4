import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormLoginRoutingModule } from './form-login-routing.module';
import { FormLoginComponent } from './form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormLoginComponent
  ],
  imports: [
    CommonModule,
    FormLoginRoutingModule
  ]
})
export class FormLoginModule { }
