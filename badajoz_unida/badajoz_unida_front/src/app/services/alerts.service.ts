import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn btn-danger me-3',
      cancelButton: 'btn btn-light'
    },
    buttonsStyling: false
  });

  constructor() { }

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
