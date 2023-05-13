import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  passwordsIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup) =>{
      const pass1control = formGroup.controls[pass1];
      const pass2control = formGroup.controls[pass2];
      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null);
      } else {
        pass2control.setErrors({noEsIgual:true});
      }
    }
  }

  /**
   * Comprueba que el usuario sea mayor de 16 años.
   */
  comprobarEdad(control: FormControl) {
      let convertirFecha = new Date(control.value).getTime();
      let timeDiff = Math.abs(Date.now() - convertirFecha);
      let edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      if(edad < 16){
        return { menor16: true };
      }
      return null;
  }

  comprobarIdioma(control: FormControl){
    return control?.value == -1 ? { sinIdioma: true } : null;
  }

}
