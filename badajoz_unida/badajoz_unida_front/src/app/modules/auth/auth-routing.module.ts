import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('src/app/modules/form-login/form-login-routing.module').then(module => module.FormLoginRoutingModule) },
  { path: 'registro', loadChildren: () => import('src/app/modules/form-register/form-register.module').then(module => module.FormRegisterModule) },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
