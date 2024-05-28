/**
 @file Contiene la vista del carrusel de tarjetas
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, Input, OnInit} from '@angular/core';
import {EventosService} from "../../services/eventos.service";
import {UsuariosService} from "../../services/usuarios.service";

/**
 Vista del carrusel de tarjetas
 **/
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() tipo: string;
  peticion: any;
  usuario: any = {};
  eventos: any[] = [];
  eventosAgrupados: any[] = []
  loading: boolean = true;
  listaInscripciones: any[] = [];

  /**
   Constructor de la clase
   **/
  constructor(private _eventosService: EventosService, private _usuarioService: UsuariosService) {
  }
  /**
   Método que inicializa la vista
   **/
    ngOnInit() {
    this.loadEventsByUser(); // Cargar las inscripciones del usuario

    this._usuarioService.getDatosUsuario().subscribe((data: any) => {
      this.usuario.intereses = []
      for (let interes of data.intereses) {
        this.usuario.intereses.push(interes.interesId.toString());
      }
      switch (this.tipo) {
        case 'recientes':
          this.peticion = this._eventosService.getEventosByNovedad();
          break;
        case 'interes':
          this.peticion = this._eventosService.getEventosFiltered(this.usuario);
          break;
        default:
          this.peticion = this._eventosService.getAllEventos();
      }
      this.peticion.subscribe((data: any) => {
        this.eventos = data;
        this.filtrarEventos(); // Filtrar los eventos
        this.agruparEventos();
        this.loading = false;
        console.log(this.eventos);
      });
    });
  }

  /**
   Método que carga los eventos a los que está inscrito el usuario
   **/
  loadEventsByUser() {
    this._eventosService.getEventosByUserId().subscribe((data: any) => {
      this.listaInscripciones = data;
    });
  }

  /**
   Método que filtra los eventos para excluir aquellos en los que el usuario ya participa
   **/
  filtrarEventos() {
    const inscripcionesNombres = this.listaInscripciones.map(inscripcion => inscripcion.nombre);
    this.eventos = this.eventos.filter(evento => !inscripcionesNombres.includes(evento.nombre));
  }

  /**
   Método que junta los eventos en grupos de tres
   **/
  agruparEventos() {
    this.eventosAgrupados = [];
    for (let i = 0; i < this.eventos.length; i += 3) {
      this.eventosAgrupados.push(this.eventos.slice(i, i + 3));
    }
  }
}

