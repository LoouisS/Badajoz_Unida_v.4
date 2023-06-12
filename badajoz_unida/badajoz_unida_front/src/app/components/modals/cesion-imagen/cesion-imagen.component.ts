/**
 @file Contiene la vista del modal de cesión de imagen
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cesion-imagen',
  templateUrl: './cesion-imagen.component.html',
  styleUrls: ['./cesion-imagen.component.css']
})
export class CesionImagenComponent {
  @Input('usuario') usuario: any;
  @Input('evento') evento: any;
  @Output() cerrarCesionImagen: EventEmitter<any> = new EventEmitter<any>();
  @Output() inscribirUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  /**
   Método que inicializa el proceso de registro de un usuario en un evento
   **/
  registrarUsuario(){
    this.inscribirUsuario.emit();
  }

  /**
   Método que emite una señal para cerrar el modal
   **/
  cerrarModal(){
    this.cerrarCesionImagen.emit();
  }

}
