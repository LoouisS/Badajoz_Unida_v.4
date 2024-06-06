/**
 @file Contiene la vista de la tabla con los datos de las categorias
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subject } from "rxjs";
import { CategoriasService } from "../../../services/categorias.service";
import Swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocalizedComponent } from "src/app/config/localize.component";
import '@popperjs/core';
import { MessageService } from "primeng/api";

@Component({
  selector: "app-gestion-categorias-table",
  templateUrl: "./gestion-categorias-table.component.html",
  styleUrls: ["./gestion-categorias-table.component.css"],
})

/**
 Vista que muestra la tabla con los datos de las categorias
 **/
export class GestionCategoriasTableComponent
  extends LocalizedComponent
  implements OnInit, OnDestroy
{
  @ViewChild(DataTableDirective, { static: false })
  dirDataTable: DataTableDirective;
  @ViewChild("dataTable", { static: false }) table: ElementRef;
  loading: boolean;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any;
  categorias: any;
  formFilter!: FormGroup;
  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-light",
    },
    buttonsStyling: false,
  });
  dtTable: DataTables.Api;
  constructor(
    private catService: CategoriasService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.loading = true;
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
      this.loading = false;
      this.cargarTabla();
    });
    this.dtOptions = {
      paging: true,
      pagingType: "numbers",
      responsive: true,
      searching: false,
      ordering: true,
      info: false,
      destroy: true,
      lengthChange: false,
    };
    // @ts-ignore
    this.dtTrigger.next();
    this.initForm();
  }

  /**
   Método que destruye la vista
   **/
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.dtTable) {
      this.dtTable.destroy();
    }
  }

  /**
   * Método para eliminar de la aplicación una categoria registrada
   * @param categoriaId
   * @param categoria
   */
  eliminarCategoria(categoriaId: number, categoria: any) {
    this.alert
      .fire({
        icon: "question",
        title:`${this.resources.deleteCategoryMessage}`,
        text: `${this.resources.deleteCategoryMessageDetail}`,
        showConfirmButton: true,
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.catService.eliminarCategoria(categoriaId).subscribe(
            (data) => {
              console.log("ELIMINADO", data);
                                              this.messageService.add({
          severity: 'success',
          summary:`${this.resources.deletedEvent}`,
          detail:`${this.resources.categoryDeleted}`,
        }),
              this.ngOnInit();
            },
            (error) => {
                            this.messageService.add({
            severity: 'error',
            summary:`${this.resources.problemOcurred}`,
            detail:`${this.resources.problemOcurredDetail}`,
          });
            },
          );
        }
      });
  }

    limpiarFiltros() {
  // Resetear el formulario
  this.formFilter.reset();
  console.log('Formulario después de resetear', this.formFilter.value);
        this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
      this.loading = false;
      this.cargarTabla();
    });

  // Verifica también resetear cualquier estado interno que pueda ser usado en las consultas del servicio
  }

  /**
   * Método para la edición de una categoría preexistente
   * @param cat
   */
  editCategoria(cat: any) {
    this.catService.setEditCategoria(cat);
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
      info: false,
      lengthChange: false,
      pagingType: "numbers",
      destroy: true,
    };
    setTimeout(() => {
      $(this.table.nativeElement).DataTable(this.dtOptions);
      // @ts-ignore
      this.dtTrigger.next();
    }, 1);
  }

  /**
   * Método para la inicialización del formulario del componente
   * @private
   */
  private initForm() {
    this.formFilter = this.formBuilder.group({
      titulo: [],
      activo: [true],
    });
  }

  /**
   * Método para realizar el filtrado de Eventos en la aplicación
   */
  filterCategorias() {
    const filtros = {
      titulo: this.formFilter.get("titulo").value,
      activo: this.formFilter.get("activo").value,
    };
    console.log(filtros);
    this.catService.getCategoriasFiltered(filtros).subscribe((data) => {
      this.categorias = data;
      this.cargarTabla();
    });
  }
}
