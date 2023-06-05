import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "../auth/auth/auth.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', loadChildren:() => import('../index/index.module').then(module => module.IndexModule) },
  { path: 'mis-eventos', loadChildren:() => import('../my-events/my-events.module').then(module => module.MyEventsModule) },
  { path: 'gestion-eventos', loadChildren:() => import('../gestion-eventos/gestion-eventos.module').then(module => module.GestionEventosModule) },
  { path: 'gestion-categorias', loadChildren:() => import('../gestion-categorias/gestion-categorias.module').then(module => module.GestionCategoriasModule) },
  { path: 'gestion-intereses', loadChildren:() => import('../gestion-intereses/gestion-intereses.module').then(module => module.GestionInteresesModule) },
  { path: 'eventos', loadChildren:() => import('../events/events.module').then(module => module.EventsModule) },
  { path: 'perfil', loadChildren:() => import('../profile/profile.module').then(module => module.ProfileModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
