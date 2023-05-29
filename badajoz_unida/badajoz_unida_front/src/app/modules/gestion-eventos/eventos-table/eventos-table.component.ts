/**
 @file Contiene la tabla con los datos de los eventos
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";
import {CategoriasService} from "../../../services/categorias.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-eventos-table',
  templateUrl: './eventos-table.component.html',
  styleUrls: ['./eventos-table.component.css']
})

/**
 Tabla con los datos de los eventos
 **/
export class EventosTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dataTable', { static: false }) table: ElementRef;
  @ViewChild(DataTableDirective, { static: false }) dirDataTable: DataTableDirective;
  @Output() mostrarModal: EventEmitter<any> = new EventEmitter<any>();
  eventos: any;
  categorias: any;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any;
  dtTable: DataTables.Api;
  formFilter!: FormGroup;
  loading: boolean = true;

  /**
   Constructor de la clase
   @param eventoService {EventosService} Servicio que gestiona los datos de los eventos
   **/
  constructor(private eventoService: EventosService, private catService: CategoriasService, private formBuilder: FormBuilder) {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.initForm()
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
    this.dtOptions = {
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      destroy: true
    };
    // @ts-ignore
    this.dtTrigger.next();
    this.eventoService.getAllEventos().subscribe((data) => {
      this.eventos = data;
      console.log("EVENTOS:", this.eventos);
      this.cargarTabla();
    })
  }

  /**
   Método que realiza acciones después de iniciar la vista
   **/
  ngAfterViewInit() {
  }

  /**
   Método que destruye la vista
   **/
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.dtTable) {
      this.dtTable.destroy()
    }
  }

  /**
   Método que carga los datos en la datatable
   **/
  cargarTabla() {
    this.loading = false;
      $(this.table.nativeElement).DataTable().destroy();
      this.dtOptions = {
        paging: true,
        searching: false,
        ordering: true,
        info: true,
        destroy: true
      };
      setTimeout(() => {
        $(this.table.nativeElement).DataTable(this.dtOptions);
        // @ts-ignore
        this.dtTrigger.next();
      }, 1);
    }

  private initForm() {
    this.formFilter = this.formBuilder.group({
      nombre:[],
      localizacion:[],
      fechaInit:[],
      fechaEnd:[],
      intereses:[]
    });
  }

  filtrarBusqueda() {
    const intereses = this.formFilter.get('intereses').value;
    const fechaInitValue = this.formFilter.get('fechaInit').value;
    const fechaEndValue = this.formFilter.get('fechaEnd').value;

    const fechaInit = fechaInitValue ? new Date(fechaInitValue) : null;
    const fechaEnd = fechaEndValue ? new Date(fechaEndValue) : null;

    if (fechaInit && isNaN(fechaInit.getTime())) {
      return;
    }

    if (fechaEnd && isNaN(fechaEnd.getTime())) {
      return;
    }

    const filtros = {
      nombre: this.formFilter.get('nombre').value,
      localizacion: this.formFilter.get('localizacion').value,
      fechaInit: fechaInit ? fechaInit.toISOString() : null,
      fechaEnd: fechaEnd ? fechaEnd.toISOString() : null,
      intereses: Array.isArray(intereses) ? intereses : [intereses]
    };

    console.log("ENVIANDO");
    this.eventoService.getEventosFiltered(filtros).subscribe((data) => {
      this.eventos = data;
      console.log("EVENTOS FILTRADOS", this.eventos);
    });
  }

  mostrarModalEventos(){
    this.mostrarModal.emit();
  }

  deleteEvent(eventosId: number) {
    console.log("eliminando")
    this.eventoService.deleteEventById(eventosId).subscribe((data) =>{
      console.log("ELIMINADO", data);
    });
  }

  modEvent(eventosId: number) {

  }
}
