/**
 @file Contiene la vista del componente principal
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 Vista del componente principal
 **/
export class HomeComponent implements OnInit{

  menuTamano: number = 78;

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
  }

  /**
   Registra el tamaño del menú de navegación
   @param tamano {number} Tamaño del menú
   **/
  cambiarTamano(tamano: number){
    this.menuTamano = tamano;
  }

}
