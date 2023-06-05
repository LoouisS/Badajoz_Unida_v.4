import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CesionImagenComponent} from "./cesion-imagen/cesion-imagen.component";
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { CrearInteresComponent } from './crear-interes/crear-interes.component';



@NgModule({
  declarations: [
    CesionImagenComponent,
    CrearCategoriaComponent,
    CrearInteresComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        CesionImagenComponent,
        CrearCategoriaComponent,
        CrearInteresComponent
    ]
})
export class ModalsModule { }
