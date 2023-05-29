import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CesionImagenComponent} from "./cesion-imagen/cesion-imagen.component";



@NgModule({
  declarations: [
    CesionImagenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CesionImagenComponent
  ]
})
export class ModalsModule { }
