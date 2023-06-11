import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionInteresesComponent} from "./gestion-intereses/gestion-intereses.component";
import {LoginGuard} from "../../security/services/guards/login.guard";
import {ProdGuardService} from "../../security/services/guards/prod-guards.service";


const routes: Routes = [
  { path: '', component: GestionInteresesComponent, canActivate: [LoginGuard, ProdGuardService], data: { expectedRol: ['admin', 'colaborador'] } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionInteresesRoutingModule { }
