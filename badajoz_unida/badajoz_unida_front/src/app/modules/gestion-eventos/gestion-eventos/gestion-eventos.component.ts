/**
 @file Contiene la vista de la gestión de los eventos
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import * as jQuery from 'jquery';
import {CategoriasService} from "../../../services/categorias.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CrearEventoModalComponent} from "../../../components/modals/crear-evento-modal/crear-evento-modal.component";

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

  @ViewChild('eventosForm') eventosForm: TemplateRef<any>;
  @ViewChild('modalCrearEvento',{static:false}) modalCrearEvento: CrearEventoModalComponent;

  constructor(private catService: CategoriasService, private modalService: NgbModal) {
  }
  ngOnInit() {
  }

  mostrarModalEventos() {
    this.modalService.open(this.eventosForm, {size: 'xl', backdrop: 'static'})
  }

  cerrarModalEventos(){
    this.modalService.dismissAll(this.eventosForm);
  }
}
