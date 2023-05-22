/**
 @file Contiene la vista de la barra de navegación
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

/**
 Vista de la barra de navegación
 **/
export class NavBarComponent {

  @Output() menuOpened = new EventEmitter<number>();
  isOpened: boolean = false;

  /**
   Método que detecta si el menú de navegación esta abierto o cerrado
   **/
  toggleMenu(){
    this.isOpened = this.isOpened ? false : true;
    this.isOpened ? this.menuOpened.emit(240) : this.menuOpened.emit(78);
  }

}
