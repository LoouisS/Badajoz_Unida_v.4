import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CesionImagenComponent} from "./cesion-imagen/cesion-imagen.component";
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { CrearInteresComponent } from './crear-interes/crear-interes.component';
import { EditarInteresesComponent } from './editar-intereses/editar-intereses.component';



@NgModule({
  declarations: [
    CesionImagenComponent,
    CrearCategoriaComponent,
    CrearInteresComponent,
    EditarInteresesComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        CesionImagenComponent,
        CrearCategoriaComponent,
        CrearInteresComponent,
      EditarInteresesComponent
    ]
})
export class ModalsModule { }
