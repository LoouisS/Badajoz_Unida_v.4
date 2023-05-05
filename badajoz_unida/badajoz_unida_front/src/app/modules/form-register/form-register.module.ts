import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRegisterRoutingModule } from './form-register-routing.module';
import { FormRegisterComponent } from './form-register/form-register.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormRegisterComponent
  ],
    imports: [
        CommonModule,
        FormRegisterRoutingModule,
      ReactiveFormsModule
    ]
})
export class FormRegisterModule { }
