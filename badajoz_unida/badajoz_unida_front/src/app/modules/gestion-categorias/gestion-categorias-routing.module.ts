import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionCategoriasComponent} from "./gestion-categorias/gestion-categorias.component";
import {LoginGuard} from "../../security/services/guards/login.guard";
import {ProdGuardService} from "../../security/services/guards/prod-guards.service";

const routes: Routes = [
  { path: '', component: GestionCategoriasComponent, canActivate: [LoginGuard, ProdGuardService], data: { expectedRol: ['admin', 'colaborador'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCategoriasRoutingModule { }
