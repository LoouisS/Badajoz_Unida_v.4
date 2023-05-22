/**
 @file Contiene la vista del carrusel de tarjetas
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, Input, OnInit} from '@angular/core';

/**
 Vista del carrusel de tarjetas
 **/
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() eventos: any[] = [];
  eventosAgrupados: any[] = []

  /**
   Constructor de la clase
   **/
  constructor() {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.agruparEventos();
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
