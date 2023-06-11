import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from "./events/events.component";
import {LoginGuard} from "../../security/services/guards/login.guard";
import {ProdGuardService} from "../../security/services/guards/prod-guards.service";

const routes: Routes = [
  { path: '', component: EventsComponent, canActivate: [LoginGuard, ProdGuardService], data: { expectedRol: ['admin', 'colaborador', 'user'] } },
  { path: ':id', loadChildren:() => import('../event/event.module').then(module => module.EventModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
