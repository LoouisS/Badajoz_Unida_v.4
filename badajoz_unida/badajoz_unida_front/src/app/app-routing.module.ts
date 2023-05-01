import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./modules/auth/auth/auth.component";

const routes: Routes = [
  { path: 'auth', component: AuthComponent, loadChildren:() => import('./modules/auth/auth.module').then(module => module.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
