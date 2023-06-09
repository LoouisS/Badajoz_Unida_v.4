import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionUsuariosComponent} from "./gestion-usuarios/gestion-usuarios.component";

const routes: Routes = [
  { path: '', component: GestionUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUsuariosRoutingModule { }
