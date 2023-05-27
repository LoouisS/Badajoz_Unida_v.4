/**
 @file Contiene la vista del carrusel de tarjetas
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, Input, OnInit} from '@angular/core';
import {EventosService} from "../../services/eventos.service";

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
  eventos: any[] = [];
  eventosAgrupados: any[] = []
  loading: boolean = true;

  /**
   Constructor de la clase
   **/
  constructor(private _eventosService: EventosService) {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {

    switch(this.tipo){
      case 'recientes':
        this.peticion = this._eventosService.getEventosByNovedad();
        break;
      default:
        this.peticion = this._eventosService.getAllEventos();
    }

    this.peticion.subscribe((data: any) => {
      this.eventos = data;
      this.agruparEventos();
      this.loading = false;
      console.log(this.eventos);
    })
  }

  /**
   Método que junta los eventos en grupos de tres
   **/
  agruparEventos(){
    for(let i=0; i<this.eventos.length; i+=3){
      this.eventosAgrupados.push(this.eventos.slice(i, i + 3));
    }
  }

}
