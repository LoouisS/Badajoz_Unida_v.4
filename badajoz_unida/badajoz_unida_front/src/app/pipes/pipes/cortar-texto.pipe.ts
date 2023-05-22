/**
 @file Pipeline que recorta una cadena de texto largo
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarTexto'
})

/**
 Pipeline que recorta textos largos
 **/
export class CortarTextoPipe implements PipeTransform {

  /**
   Transforma textos largos en el número de carácteres especificados en los parametros
   @return {string} Cadena de texto cortada
   **/
  transform(value:string, numCaracteres:number = 350):string {
    return (value.length>numCaracteres) ? value.slice(0, numCaracteres-1) + '...' : value;
  }

}
