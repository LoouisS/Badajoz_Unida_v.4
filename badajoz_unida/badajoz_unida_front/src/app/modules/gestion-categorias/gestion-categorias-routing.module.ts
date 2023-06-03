import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionCategoriasComponent} from "./gestion-categorias/gestion-categorias.component";

const routes: Routes = [
  { path: '', component: GestionCategoriasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCategoriasRoutingModule { }
