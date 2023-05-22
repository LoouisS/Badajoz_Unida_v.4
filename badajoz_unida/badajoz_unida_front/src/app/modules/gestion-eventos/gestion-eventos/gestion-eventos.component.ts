/**
 @file Contiene la vista de la gestión de los eventos
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import * as jQuery from 'jquery';
import {CategoriasService} from "../../../services/categorias.service";

declare var $: any;
@Component({
  selector: 'app-gestion-eventos',
  templateUrl: './gestion-eventos.component.html',
  styleUrls: ['./gestion-eventos.component.css']
})

/**
 Vista de la gestión de eventos
 **/
export class GestionEventosComponent implements OnInit{

  constructor(private catService: CategoriasService) {
  }
  ngOnInit() {
  }

  desplegarModal() {
    $('#exampleModal').modal('show');
  }
}
