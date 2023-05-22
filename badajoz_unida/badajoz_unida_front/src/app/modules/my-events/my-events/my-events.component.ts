/**
 @file Contiene la vista del componente que muestra los eventos a los que esta inscrito el usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})

/**
 Vista del componente que muestra los eventos a los que esta inscrito el usuario
 **/
export class MyEventsComponent implements OnInit{

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
  }

}
