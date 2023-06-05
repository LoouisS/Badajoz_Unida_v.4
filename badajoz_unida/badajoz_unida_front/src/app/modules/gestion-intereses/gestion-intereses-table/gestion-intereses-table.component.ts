import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {CategoriasService} from "../../../services/categorias.service";
import {InteresesService} from "../../../services/intereses.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-gestion-intereses-table',
  templateUrl: './gestion-intereses-table.component.html',
  styleUrls: ['./gestion-intereses-table.component.css']
})
export class GestionInteresesTableComponent implements OnInit,OnDestroy{
  @ViewChild(DataTableDirective, { static: false }) dirDataTable: DataTableDirective;
  @ViewChild('dataTable', { static: false }) table: ElementRef;
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
  constructor(private catService: CategoriasService, private interesService: InteresesService) {
  }
  ngOnInit() {
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
      console.log("CATEGORÍAS", data);
      this.loading = false;
    });
    this.interesService.getAll().subscribe((data) => {
      console.log("INTERESES", data);
      this.intereses = data;
      this.cargarTabla();
    })
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

  editInteres(interes: any) {
    this.interesService.setEditInteres(interes);
  }

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
}
