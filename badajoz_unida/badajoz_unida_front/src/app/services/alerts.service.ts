/**
 @file Contiene el servicio que gestiona las alertas
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { LocalizedComponent } from '../config/localize.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService extends LocalizedComponent {

  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    confirmButtonText: `${this.resources.confirm}`,
    cancelButtonText: `${this.resources.cancel}`,
    customClass: {
      confirmButton: 'btn btn-danger me-3',
      cancelButton: 'btn btn-light'
    },
    buttonsStyling: false
  });

  constructor() { super();}

  /**
   Método que muestra una alerta informativa
   @param titulo {string} Titulo de la ventana
   @param mensaje {string} Titulo de la alerta
   **/
  showInfoAlert(titulo: string, mensaje: string){
    this.alert.fire({
      title: titulo,
      text: mensaje,
      icon: 'info',
      timer: 2500,
      showConfirmButton: false,
      showCancelButton: false,
    });
  }

  /**
   Método que muestra una alerta de exito
   @param titulo {string} Titulo de la ventana
   @param mensaje {string} Titulo de la alerta
   **/
  showSuccessAlert(titulo: string, mensaje: string){
    this.alert.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      timer: 2500,
      showConfirmButton: false,
      showCancelButton: false,
    });
  }

  /**
   Método que muestra una alerta que comprueba la decisión del usuario
   @param titulo {string} Titulo de la ventana
   @param mensaje {string} Titulo de la alerta
   @return {boolean}
   **/
  async askConfirmation(titulo: string, mensaje: string){
    let respuesta: boolean;

    await this.alert.fire({
      title: titulo,
      text: mensaje,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        respuesta = true;
      } else {
        respuesta = false;
      }
    });

    return respuesta;

  }

}
