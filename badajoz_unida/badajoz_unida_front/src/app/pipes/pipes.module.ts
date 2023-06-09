import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CortarTextoPipe} from "./pipes/cortar-texto.pipe";
import {InicialesNombrePipe} from "./pipes/iniciales-nombre.pipe";



@NgModule({
  declarations: [
    CortarTextoPipe,
    InicialesNombrePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CortarTextoPipe,
    InicialesNombrePipe
  ]
})
export class PipesModule { }
