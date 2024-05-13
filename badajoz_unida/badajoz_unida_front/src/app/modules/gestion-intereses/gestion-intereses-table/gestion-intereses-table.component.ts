/**
 @file Contiene la vista de la tabla de intereses
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {CategoriasService} from "../../../services/categorias.service";
import {InteresesService} from "../../../services/intereses.service";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestion-intereses-table',
  templateUrl: './gestion-intereses-table.component.html',
  styleUrls: ['./gestion-intereses-table.component.css']
})

/**
 Vista de la tabla con los datos de los intereses
 **/
export class GestionInteresesTableComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) dirDataTable: DataTableDirective;
  @ViewChild('dataTable', { static: false }) table: ElementRef;
  formFilter!: FormGroup;
  categorias: any;
  intereses: any;
  loading: boolean;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any;
  dtTable: DataTables.Api;
  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-light'
    },
    buttonsStyling: false
  });

  /**
   Contructor de la clase
   @param catService {CategoriasService} Servicio que gestiona los datos de las categorias
   @param interesService {InteresesService} Servicio que gestiona los datos de los intereses
   @param formBuilder {FormBuilder} Clase que gestiona el formulario reactivo
   * @param router
   **/
  constructor(private catService: CategoriasService,
              private interesService: InteresesService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.initForm();
    this.loading = true;
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
      console.log("CATEGORÍAS", data);
      this.interesService.getAll().subscribe((data) => {
        console.log("INTERESES", data);
        // @ts-ignore
        for (let interes of data) {
          interes.categoria = this.categorias.find((categoria) => {
            return categoria.intereses.some((int) => int.titulo === interes.titulo);
          });
        }
        this.intereses = data;
        console.log("LOS INTERESES DESPUÉS DE MONTARLO", this.intereses);
        this.cargarTabla();
      })
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
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.dtTable) {
      this.dtTable.destroy()
    }
  }
  /**
   * Método para el reinstanciamiento de la datatable del template
   */
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

  /**
   * Método para el desencadenamiento de la edición de un interés
   * @param interes
   */
  editInteres(interes: any) {
    this.interesService.setEditInteres(interes);
  }

  /**
   * Método para la eliminación de un registro de tipo interés del sistema
   * @param interes
   */
  deleteInteres(interes: any) {
    this.alert.fire({
      icon:'question',
      title:'¿Estás seguro que deseas eliminar el interés',
      text:'Se eliminara el interés con nombre' + interes?.titulo + 'de forma permanente',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) =>{
      if(result.isConfirmed){
        this.alert.fire({
          title:'Espere mientras procesamos su solicitud',
          didOpen(popup: HTMLElement) {
            Swal.showLoading();
          }
        })
        this.interesService.eliminarInteres(interes?.interesId).subscribe((data) =>{
          console.log("ELIMINADO", data);
          this.alert.fire({
            title: 'Eliminado con éxito!',
            text: 'El interes con nombre' + interes?.titulo +'ha sido eliminado correctamente.',
            icon: 'success',
            timer: 4000,
            showConfirmButton: false,
            showCancelButton: false,
          });
          this.ngOnInit();
        }, error=>{
          this.alert.fire({
            title: 'Ocurrió un problema!',
            text: 'Vuelva a intentarlo en otro momento',
            icon: 'error',
            timer: 4000,
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
      }
    });
  }
  /**
   * Método para realizar el filtrado de categorias en la aplicación
   */
  filterIntereses() {
    const filtros = {
      titulo: this.formFilter.get('titulo').value,
      activo: this.formFilter.get('activo').value
    };
    console.log(filtros);
    this.interesService.getInteresesFiltered(filtros).subscribe((data) => {
      this.intereses = data;
      this.cargarTabla();
    })
  }
  /**
   * Método para la inicialización del formulario del componente
   * @private
   */
  private initForm() {
    this.formFilter = this.formBuilder.group({
      titulo:[],
      activo:[true]
    });
  }
}
