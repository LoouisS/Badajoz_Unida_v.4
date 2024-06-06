/**
 @file Contiene la vista del modal de cesión de imagen
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, EventEmitter, Input, Output} from '@angular/core';
import { LocalizedComponent } from 'src/app/config/localize.component';

@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
  styleUrls: ['./politica-privacidad.component.css']
})
export class PoliticaPrivacidadComponent extends LocalizedComponent {
  @Input('usuario') usuario: any;
  @Input('evento') evento: any;
  @Output() cerrarCesionImagen: EventEmitter<any> = new EventEmitter<any>();
  @Output() inscribirUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
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
