import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import {FormLoginModule} from "../form-login/form-login.module";
import { FormRegisterModule } from '../form-register/form-register.module';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormLoginModule,
    FormRegisterModule
  ]
})
export class AuthModule { }
