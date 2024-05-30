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
import { StickyShareButtonsConfig } from 'sharethis-angular';
import { MessageService } from 'primeng/api';

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
    clima: any;
    //Sticky Share Buttons

 stickyShareButtonsConfig: StickyShareButtonsConfig={
            alignment: 'right',    // alignment of buttons (left, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            hide_desktop: false,  // hide buttons on desktop (true, false)
            labels: 'counts',     // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            min_count: 0,         // hide react counts less than min_count (INTEGER)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'facebook',
              'twitter',
              'whatsapp',
              'linkedin',
              'email',
              'sms'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: false,     // show/hide the total share count (true, false)
            show_mobile: false,    // show/hide the buttons on mobile (true, false)
            show_toggle: true,    // show/hide the toggle buttons (true, false)
            size: 48,             // the size of each button (INTEGER)
            top: 160,             // offset in pixels from the top of the page


            // OPTIONAL PARAMETERS

            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description: 'Te gustaria participar en el proximo gran evento?',       // (defaults to og:description or twitter:description)
            title: 'Badajoz unida',            // (defaults to og:title or twitter:title)
            message: 'hola',     // (only for email sharing)
            subject: 'holaasdf',  // (only for email sharing)
            username: 'ffff' // (only for twitter sharing)
};


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
    private messageService: MessageService
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
            this.clima = data
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
        this.messageService.add({
          severity: 'success',
          summary: 'Te has registrado correctamente',
          detail: 'Esperamos verte en el evento',
        }),
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al registrarse',
            detail: 'No se ha podido registrar al usuario',
          });
        }
        this.checkUserRegister();
        if (data['status'] != 'error') {
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
                    this.messageService.add({
          severity: 'success',
          summary: 'Participación cancelada',
          detail: 'Esperamos verte pronto',
        }),
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al cancelar la participación',
            detail: 'No se ha podido cancelar la participación',
          });
        }

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
