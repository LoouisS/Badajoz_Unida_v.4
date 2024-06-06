/**
 @file Contiene la vista del componente que muestra los eventos a los que esta inscrito el usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import { LocalizedComponent } from 'src/app/config/localize.component';
import {EventosService} from "../../../services/eventos.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})

/**
 Vista del componente que muestra los eventos a los que esta inscrito el usuario
 **/
export class MyEventsComponent extends LocalizedComponent implements OnInit{

  listaInscripciones : any[];
  loading: boolean = true;

  constructor(private _eventosServices: EventosService) {
    super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.loadEventsByUser();
    this._eventosServices.notifyRefreshCards().subscribe((data: any) => {
      this.loading = true;
      this.loadEventsByUser();
    })
  }

  /**
   Método trae los eventos asociados al usuario
   **/
  loadEventsByUser(){
    this._eventosServices.getEventosByUserId().subscribe((data: any) => {
      this.listaInscripciones = data;
      this.loading = false;
    })
  }

}
