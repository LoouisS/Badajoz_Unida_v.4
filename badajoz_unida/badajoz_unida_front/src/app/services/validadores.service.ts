/**
 @file Servicio que realiza validaciones personalizadas para los formularios
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";


/**
 Servicio que hace validaciones personalizadas
 **/
@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  /**
   Constructor de la clase
   **/
  constructor() { }

  /**
   Método que comprueba que las contraseñas introducidas en los campos de contraseña y repetir contraseña sean iguales
   @param pass1 {string} Clave introducida en el campo de contraseña
   @param pass2 {string} Clave introducida en el campo de repetir contraseña
   **/
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
   Comprueba que el usuario sea mayor de 16 años
   @param control {FormControl} Campo de fecha de nacimiento del formulario
   **/
  comprobarEdad(control: FormControl) {
      let convertirFecha = new Date(control.value).getTime();
      let timeDiff = Math.abs(Date.now() - convertirFecha);
      let edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      if(edad < 16){
        return { menor16: true };
      }
      return null;
  }

  /**
   Método que comprueba que se haya seleccionado un idioma
   @param control {FormControl} Campo de selección de idiomas
   **/
  comprobarIdioma(control: FormControl){
    return control?.value == -1 ? { sinIdioma: true } : null;
  }
  validateFecha(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      return { invalidFecha: true };
    }

    return null;
  }

  validateImgExtension(control: AbstractControl): ValidationErrors | null {
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const fileName = control.value;
    const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return { invalidImgExtension: true };
    }

    return null;
  }
}
