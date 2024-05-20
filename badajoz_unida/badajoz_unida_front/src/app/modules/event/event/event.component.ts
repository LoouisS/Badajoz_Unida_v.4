/**
 @file Contiene la vista de un evento
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { AlertsService } from '../../../services/alerts.service';
import { TokenService } from '../../../security/services/auth/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})

/**
 Vista de la vista que muestra el contenido de un evento
 **/
export class EventComponent implements OnInit {
  eventoId!: number;
  evento: any;
  map: any;
  marker: any;
  usuario: any;
  registrado: boolean = false;
  @ViewChild('cesionImagen') cesionImagen: TemplateRef<any>;

  /**
   Constructor de la clase
   @param activatedRoute {ActivatedRoute} Servicio que recupera información de la ruta de enlace
   @param _eventosService {EventosService} Servicio que gestiona los datos de los eventos
   **/
  constructor(
    private activatedRoute: ActivatedRoute,
    private _eventosService: EventosService,
    private _weatherService: WeatherService,
    private _alertsService: AlertsService,
    private _tokenService: TokenService,
    private _modalService: NgbModal,
  ) { }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.usuario = this._tokenService.getNombreApellidos();
    this.activatedRoute.params.subscribe((parametros) => {
      this.eventoId = parametros['id'];
    });
    this._eventosService
      .getEventosById(this.eventoId)
      .subscribe((data: any) => {
        this.evento = data;
        this._weatherService
          .getWeatherData(this.evento.latitud, this.evento.longitud,this.evento.fechaHora.split('T')[0])
          .subscribe((data: any) => {
            console.log(data);
            this.evento.temperatura = data.temperature;
            console.log(this.evento.temperatura);
          });

        this.initMap();
        console.log(this.evento);
      });
    this._eventosService
      .checkUserRegister(this.eventoId)
      .subscribe((data: boolean) => {
        this.registrado = data;
      });
    this.checkUserRegister();
  }

  /**
   Método que carga el mapa interactivo
   **/
  initMap() {
    const defaultLatLng = L.latLng([this.evento.latitud, this.evento.longitud]); // Latitud y longitud de Badajoz

    this.map = L.map('map').setView(defaultLatLng, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.marker = L.marker(defaultLatLng)
      .addTo(this.map)
      .bindPopup(this.evento.localizacion)
      .openPopup();
  }

  /**
   Método que inscribe a un usuario en un evento
   **/
  registerUserInEvent() {
    this._eventosService
      .registerUserInEvent(this.eventoId)
      .subscribe((data: any) => {
        this.checkUserRegister();
        if (data['status'] != 'error') {
          this._alertsService.showSuccessAlert(
            'Te has apuntado con éxito',
            'Gracias por acompañarnos, te vemos allí',
          );
          this.cerrarCesionImagenModal();
        }
      });
  }

  /**
   Método que desinscribe a un usuario de un evento
   **/
  async removeUserFromEvent() {
    let respuesta = await this._alertsService.askConfirmation(
      'Quieres desapuntarte de ' + this.evento.nombre,
      '¿Estas seguro de querer desapuntarte de este evento?',
    );
    if (respuesta) {
      this._eventosService
        .removeUserFromEvent(this.eventoId)
        .subscribe((data: any) => {
          this.checkUserRegister();
          if (data['status'] != 'error') {
            this._alertsService.showInfoAlert(
              'Te has desapuntado del evento',
              'Que pena que no puedas acompañarnos, esperamos verte en otro evento',
            );
          }
        });
    }
  }

  /**
   Método que comprueba la participación
   **/
  checkUserRegister() {
    this._eventosService
      .checkUserRegister(this.eventoId)
      .subscribe((data: boolean) => {
        this.registrado = data;
      });
  }

  /**
   Muestra el modal de cesión de imagen para participar en un evento
   **/
  openCesionImagenModal() {
    this._modalService.open(this.cesionImagen, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  /**
   Cierra el modal de cesión de imagen
   **/
  cerrarCesionImagenModal() {
    this._modalService.dismissAll(this.cesionImagen);
  }
}
