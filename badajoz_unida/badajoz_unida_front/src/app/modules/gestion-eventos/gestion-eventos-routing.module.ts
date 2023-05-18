import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionEventosComponent} from "./gestion-eventos/gestion-eventos.component";

const routes: Routes = [
  { path: '', component: GestionEventosComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEventosRoutingModule { }
