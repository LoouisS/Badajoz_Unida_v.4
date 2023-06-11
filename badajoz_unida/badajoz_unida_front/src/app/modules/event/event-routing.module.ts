import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from "./event/event.component";
import {LoginGuard} from "../../security/services/guards/login.guard";
import {ProdGuardService} from "../../security/services/guards/prod-guards.service";

const routes: Routes = [
  { path: '', component: EventComponent, canActivate: [LoginGuard, ProdGuardService], data: { expectedRol: ['admin', 'colaborador', 'user'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
