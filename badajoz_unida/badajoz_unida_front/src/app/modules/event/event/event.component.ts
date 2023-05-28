/**
 @file Contiene la vista de un evento
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/


import {Component, OnInit} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";
import {ActivatedRoute} from "@angular/router";
import * as L from "leaflet";
import Swal from "sweetalert2";

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
  registrado: boolean = false;

  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-light'
    },
    buttonsStyling: false
  });

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
    this._eventosService.getEventosById(this.eventoId).subscribe((data: any) => {
      this.evento = data;
      this.initMap();
    });
    this._eventosService.checkUserRegister(this.eventoId).subscribe((data: boolean) => {
      this.registrado = data;
    })
    this.checkUserRegister();
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

  registerUserInEvent(){
    this._eventosService.registerUserInEvent(this.eventoId).subscribe((data: any) => {
      this.checkUserRegister();
      if (data['status'] != 'error') {
        this.alert.fire({
          title: 'Te has apuntado con éxito',
          text: 'Gracias por acompañarnos, te vemos allí',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    });
  }

  removeUserFromEvent(){
    this._eventosService.removeUserFromEvent(this.eventoId).subscribe((data: any) => {
      this.checkUserRegister();
      if (data['status'] != 'error') {
        this.alert.fire({
          title: 'Te has desapuntado del evento',
          text: 'Que pena que no puedas acompañarnos, esperamos verte en otro evento',
          icon: 'info',
          timer: 3000,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    });
  }

  checkUserRegister(){
    this._eventosService.checkUserRegister(this.eventoId).subscribe((data: boolean) => {
      this.registrado = data;
    })
  }

}
