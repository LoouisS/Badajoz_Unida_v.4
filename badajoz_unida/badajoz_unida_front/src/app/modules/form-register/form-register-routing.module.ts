import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormRegisterComponent} from "./form-register/form-register.component";

const routes: Routes = [
  { path: '', component: FormRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegisterRoutingModule { }
