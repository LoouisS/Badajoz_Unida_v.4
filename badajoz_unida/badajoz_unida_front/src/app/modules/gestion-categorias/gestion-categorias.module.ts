import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCategoriasRoutingModule } from './gestion-categorias-routing.module';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';
import { GestionCategoriasTableComponent } from './gestion-categorias-table/gestion-categorias-table.component';
import {SharedModule} from "../../shared/shared.module";
import {DataTablesModule} from "angular-datatables";
import {PipesModule} from "../../pipes/pipes.module";
import {ModalsModule} from "../../components/modals/modals.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GestionCategoriasComponent,
    GestionCategoriasTableComponent
  ],
    imports: [
        CommonModule,
        GestionCategoriasRoutingModule,
        SharedModule,
        DataTablesModule,
        PipesModule,
        ModalsModule,
        ReactiveFormsModule
    ]
})
export class GestionCategoriasModule { }
