import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionInteresesRoutingModule } from './gestion-intereses-routing.module';
import { GestionInteresesComponent } from './gestion-intereses/gestion-intereses.component';
import { GestionInteresesTableComponent } from './gestion-intereses-table/gestion-intereses-table.component';
import {SharedModule} from "../../shared/shared.module";
import {DataTablesModule} from "angular-datatables";
import {ModalsModule} from "../../components/modals/modals.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    GestionInteresesComponent,
    GestionInteresesTableComponent
  ],
    imports: [
        CommonModule,
        GestionInteresesRoutingModule,
        SharedModule,
        DataTablesModule,
        ModalsModule,
        ReactiveFormsModule,
        ToastModule
    ]
})
export class GestionInteresesModule { }
