import {Component, OnInit} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";
import {ActivatedRoute} from "@angular/router";
import * as L from "leaflet";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{

  eventoId!: number;
  evento: any;
  map: any;
  marker: any;
  lat: number | undefined;
  long: number | undefined

  constructor(private activatedRoute: ActivatedRoute, private _eventosService:EventosService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros => {
      this.eventoId = parametros['id'];
    })
    this.evento = this._eventosService.getEventosById(this.eventoId);
    let fechaHora: string[] = [];
    fechaHora = this.evento.fechaHora.split(' ');
    this.evento.fecha = fechaHora[0];
    this.evento.hora = fechaHora[1];
    console.log(this.evento);
    this.initMap();
  }

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
