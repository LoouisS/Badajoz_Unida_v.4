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
import { EventosTableComponent } from '../eventos-table/eventos-table.component';

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
  @ViewChild('editEventos') editarEventoModal: TemplateRef<any>;
  @ViewChild('modalCrearEvento',{static:false}) modalCrearEvento: CrearEventoModalComponent;
  @ViewChild(EventosTableComponent) tablaEventos: EventosTableComponent;


  /**
   Constructor de la clase
   @param catService {CategoriasService} Servicio que gestiona los datos de las categorias
   @param modalService {NgbModal} Servicio que controla los modales
   **/
  constructor(private catService: CategoriasService, private modalService: NgbModal) {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
  }

  /**
   Método que muestra el modal con el formulario de eventos
   **/
  mostrarModalEventos() {
    this.modalService.open(this.eventosForm, {size: 'xl', backdrop: 'static'})
  }

  editModalEventos(){
    this.modalService.open(this.editarEventoModal, {size: 'xl', backdrop: 'static'})
  }

  /**
   Método que cierra el modal de eventos
   **/
  cerrarModalEventos(){
    this.modalService.dismissAll(this.eventosForm);
    this.tablaEventos.getEventos();
  }
}
