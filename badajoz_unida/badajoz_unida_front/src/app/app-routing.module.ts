import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./modules/auth/auth/auth.component";
import {HomeComponent} from "./modules/home/home/home.component";

const routes: Routes = [
  { path: 'auth', component: AuthComponent, loadChildren:() => import('./modules/auth/auth.module').then(module => module.AuthModule) },
  { path: '', component: HomeComponent, loadChildren:() => import('./modules/home/home.module').then(module => module.HomeModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
