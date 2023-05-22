/**
 @file Contiene la vista de las tarjetas de la página
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

/**
 Vista de las tarjetas
 **/
export class CardsComponent {

  @Input() evento: any;

  /**
   Constructor de la clase
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(private router: Router) {
  }

  /**
   Cambia al componente que muestra los detalles del evento
   **/
  showEvent(id: number){
    this.router.navigate(['/eventos', id]);
  }

}
