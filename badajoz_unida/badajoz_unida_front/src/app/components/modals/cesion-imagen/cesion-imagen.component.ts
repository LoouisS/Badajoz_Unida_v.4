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

  registrarUsuario(){
    this.inscribirUsuario.emit();
  }

  cerrarModal(){
    this.cerrarCesionImagen.emit();
  }

}
