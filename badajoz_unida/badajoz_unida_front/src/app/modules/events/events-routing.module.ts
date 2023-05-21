import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from "./events/events.component";

const routes: Routes = [
  { path: '', component: EventsComponent },
  { path: ':id', loadChildren:() => import('../event/event.module').then(module => module.EventModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
