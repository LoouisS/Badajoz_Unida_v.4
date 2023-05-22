/**
 @file Contiene la vista de un evento
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/


import {Component, OnInit} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";
import {ActivatedRoute} from "@angular/router";
import * as L from "leaflet";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

/**
 Vista de la vista que muestra el contenido de un evento
 **/
export class EventComponent implements OnInit{

  eventoId!: number;
  evento: any;
  map: any;
  marker: any;

  /**
   Constructor de la clase
   @param activatedRoute {ActivatedRoute} Servicio que recupera información de la ruta de enlace
   @param _eventosService {EventosService} Servicio que gestiona los datos de los eventos
   **/
  constructor(private activatedRoute: ActivatedRoute, private _eventosService:EventosService) {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros => {
      this.eventoId = parametros['id'];
    })
    this.evento = this._eventosService.getEventosById(this.eventoId);
    this.initMap();
  }

  /**
   Método que carga el mapa interactivo
   **/
  initMap() {
    const defaultLatLng = L.latLng([this.evento.latitud, this.evento.longitud]); // Latitud y longitud de Badajoz

    this.map = L.map('map').setView(defaultLatLng, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(defaultLatLng).addTo(this.map)
      .bindPopup(this.evento.localizacion)
      .openPopup();
  }

}
