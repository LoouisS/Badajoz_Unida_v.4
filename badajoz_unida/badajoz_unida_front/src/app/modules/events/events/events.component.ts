/**
 @file Contiene la vista de los eventos disponibles
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

/**
 Vista de la vista que muestra los eventos disponibles por categorías
 **/
export class EventsComponent implements OnInit{

  listaEventos: any[] = [];

  /**
   Constructor de la clase
   @param _eventosService {EventosService} Servicio que gestiona los datos de los eventos
   **/
  constructor(private _eventosService: EventosService) {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.listaEventos = this._eventosService.getEventos();
  }

}
