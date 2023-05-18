import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEventosRoutingModule } from './gestion-eventos-routing.module';
import { GestionEventosComponent } from './gestion-eventos/gestion-eventos.component';
import {CrearEventoModalComponent} from "../../components/modals/crear-evento-modal/crear-evento-modal.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GestionEventosComponent,
    CrearEventoModalComponent
  ],
  imports: [
    CommonModule,
    GestionEventosRoutingModule,
    ReactiveFormsModule
  ]
})
export class GestionEventosModule { }
