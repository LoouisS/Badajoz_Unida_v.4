import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionUsuariosRoutingModule } from './gestion-usuarios-routing.module';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { GestionUsuariosTableComponent } from './gestion-usuarios-table/gestion-usuarios-table.component';
import {SharedModule} from "../../shared/shared.module";
import {DataTablesModule} from "angular-datatables";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GestionUsuariosComponent,
    GestionUsuariosTableComponent
  ],
    imports: [
        CommonModule,
        GestionUsuariosRoutingModule,
        SharedModule,
        DataTablesModule,
        ReactiveFormsModule
    ]
})
export class GestionUsuariosModule { }
