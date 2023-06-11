import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionEventosComponent} from "./gestion-eventos/gestion-eventos.component";
import {LoginGuard} from "../../security/services/guards/login.guard";
import {ProdGuardService} from "../../security/services/guards/prod-guards.service";

const routes: Routes = [
  { path: '', component: GestionEventosComponent, canActivate: [LoginGuard, ProdGuardService], data: { expectedRol: ['admin', 'colaborador'] } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEventosRoutingModule { }
