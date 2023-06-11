import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "../index/index/index.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginGuard} from "../../security/services/guards/login.guard";
import {ProdGuardService} from "../../security/services/guards/prod-guards.service";

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [LoginGuard, ProdGuardService], data: { expectedRol: ['admin', 'colaborador', 'user'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
