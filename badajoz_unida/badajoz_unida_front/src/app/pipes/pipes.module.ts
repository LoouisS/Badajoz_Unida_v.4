import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CortarTextoPipe} from "./pipes/cortar-texto.pipe";



@NgModule({
  declarations: [
    CortarTextoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CortarTextoPipe
  ]
})
export class PipesModule { }
