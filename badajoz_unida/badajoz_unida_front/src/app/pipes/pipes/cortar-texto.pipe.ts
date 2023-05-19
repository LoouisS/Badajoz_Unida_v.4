import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarTexto'
})
export class CortarTextoPipe implements PipeTransform {

  transform(value:string, numCaracteres:number = 350):string {
    return (value.length>numCaracteres) ? value.slice(0, numCaracteres-1) + '...' : value;
  }

}
