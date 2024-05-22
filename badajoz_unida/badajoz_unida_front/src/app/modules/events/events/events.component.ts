/**
 @file Contiene la vista de los eventos disponibles
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import { LocalizedComponent } from 'src/app/config/localize.component';
import {EventosService} from "../../../services/eventos.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

/**
 Vista de la vista que muestra los eventos disponibles por categorías
 **/
export class EventsComponent extends LocalizedComponent implements OnInit{

  /**
   Constructor de la clase
   **/
  constructor() {
    super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
  }

}
