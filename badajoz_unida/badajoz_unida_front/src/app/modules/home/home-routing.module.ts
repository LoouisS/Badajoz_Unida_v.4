import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "../auth/auth/auth.component";

const routes: Routes = [
  { path: '', loadChildren:() => import('../index/index.module').then(module => module.IndexModule) },
  { path: 'mis-eventos', loadChildren:() => import('../my-events/my-events.module').then(module => module.MyEventsModule) },
  { path: 'perfil', loadChildren:() => import('../profile/profile.module').then(module => module.ProfileModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
