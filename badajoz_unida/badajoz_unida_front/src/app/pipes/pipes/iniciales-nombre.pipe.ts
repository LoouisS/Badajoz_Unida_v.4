/**
 @file Pipeline que saca las iniciales de un nombre
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicialesNombre'
})

/**
 Pipeline que saca las iniciales de un nombre
 **/
export class InicialesNombrePipe implements PipeTransform {

  /**
   Transforma un nombre completo en dos iniciales
   @param value {string} Nombre del usuario
   @return {string} Devuelve las iniciales del nombre del usuario o vacío en caso de no ser válido
   **/
  transform(value:string): string {
    if(value.length > 0 && value != undefined ){
      let nombre:string [] = value.split(' ');
      let iniciales:string = '';

      switch(nombre.length){
        case 4:
          iniciales = nombre[1][0] + nombre[2][0];
          break;
        default:
          iniciales = nombre[0][0] + nombre[1][0];
      }

      return iniciales.toUpperCase();
    }
    return '';
  }

}
