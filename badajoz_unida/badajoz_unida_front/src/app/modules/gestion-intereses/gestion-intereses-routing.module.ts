import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionInteresesComponent} from "./gestion-intereses/gestion-intereses.component";


const routes: Routes = [
  { path: '', component: GestionInteresesComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionInteresesRoutingModule { }
