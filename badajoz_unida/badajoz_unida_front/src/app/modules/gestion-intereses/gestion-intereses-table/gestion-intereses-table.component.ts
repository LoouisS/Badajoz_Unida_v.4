import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {CategoriasService} from "../../../services/categorias.service";
import {InteresesService} from "../../../services/intereses.service";

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
}
