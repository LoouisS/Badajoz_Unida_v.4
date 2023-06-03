import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEventosRoutingModule } from './gestion-eventos-routing.module';
import { GestionEventosComponent } from './gestion-eventos/gestion-eventos.component';
import {CrearEventoModalComponent} from "../../components/modals/crear-evento-modal/crear-evento-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import { EventosTableComponent } from './eventos-table/eventos-table.component';
import {DataTablesModule} from "angular-datatables";
import {PipesModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";


@NgModule({
    declarations: [
        GestionEventosComponent,
        CrearEventoModalComponent,
        EventosTableComponent
    ],
    exports: [
        EventosTableComponent
    ],
    imports: [
        CommonModule,
        GestionEventosRoutingModule,
        ReactiveFormsModule,
        DataTablesModule,
        PipesModule,
        SharedModule,
        AngularMultiSelectModule
    ]
})
export class GestionEventosModule { }
