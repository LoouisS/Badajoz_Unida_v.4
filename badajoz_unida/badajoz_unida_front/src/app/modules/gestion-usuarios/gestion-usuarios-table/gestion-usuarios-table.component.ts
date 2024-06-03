/**
 @file Contiene la vista de la gestión de usuarios
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup} from "@angular/forms";
import { LocalizedComponent } from 'src/app/config/localize.component';

@Component({
  selector: 'app-gestion-usuarios-table',
  templateUrl: './gestion-usuarios-table.component.html',
  styleUrls: ['./gestion-usuarios-table.component.css']
})

/**
 Vista con la tablas para gestionar los datos de los usuarios
 **/
export class GestionUsuariosTableComponent extends LocalizedComponent implements OnInit{
  @ViewChild(DataTableDirective, { static: false }) dirDataTable: DataTableDirective;
  @ViewChild('dataTable', { static: false }) table: ElementRef;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any;
  usuarios: any;
  formFilter!: FormGroup;
  loading: boolean;
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
   @param usuarioService {UsuariosService} Servicio que gestiona los datos de los usuarios
   @param formBuilder {FormBuilder} Clase que gestiona el formulario reactivo
   **/
  constructor(private usuarioService: UsuariosService, private formBuilder: FormBuilder) {
super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.initForm();
    this.loading = true;
    this.usuarioService.getAll().subscribe((data) => {
      this.usuarios = data;
      this.cargarTabla();
      this.loading = false;
      console.log("Los usuarios de la aplicación",this.usuarios);
    })
  }
  /**
   * Método para el reinstanciamiento de la datatable del template
   */
  cargarTabla() {
    this.loading = false;
    $(this.table.nativeElement).DataTable().destroy();
    this.dtOptions = {
      paging: true,
      pagingType: 'numbers',
      resposive: true,
      searching: false,
      ordering: true,
      info: false,
      lengthChange: false,
      destroy: true
    };
    setTimeout(() => {
      $(this.table.nativeElement).DataTable(this.dtOptions);
      // @ts-ignore
      this.dtTrigger.next();
    }, 1);
  }

  /**
   * Método para la asignación de roles a usuarios de la aplicación
   * @param number
   */
  asignarPrivilegio(number: number, usuario: any) {
    let privilegio = '';
    if (number == 2){
      privilegio = 'usuario';
    } else if (number == 3){
      privilegio = 'colaborador';
    }
    this.alert.fire({
      icon:'question',
      title:'¿Seguro que deseas asignar estos privilegios?',
      text:'Vas a asignar a ' + usuario?.nombreUsuario + ' los privilegios de ' + privilegio +
        ', estos privilegios pueden volver a cambiar por el administrador del sistema.',
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
        this.usuarioService.cambioRol(usuario.userId,number).subscribe((data) => {
          console.log('USUARIO ROLEADO',data);
          this.alert.fire({
            title: 'Actualizado con éxito!',
            text: 'El usuario con nombre' + usuario?.nombreUsuario +'ha sido actualizado correctamente.',
            icon: 'success',
            timer: 4000,
            showConfirmButton: false,
            showCancelButton: false,
          });
          setTimeout(()=>{
            this.ngOnInit();
          },4000)
        }, error => {
          this.alert.fire({
            title: 'Hubo un problema!',
            text: 'El usuario con nombre' + usuario?.nombreUsuario +'no ha sido actualizado correctamente.',
            icon: 'error',
            timer: 4000,
            showConfirmButton: false,
            showCancelButton: false,
          });
        })
      }
    });
  }
  /**
   * Método para la inicialización del formulario del componente
   * @private
   */
  private initForm() {
    this.formFilter = this.formBuilder.group({
      nombreUsuario:[],
      nick:[],
      email:[],
      rol:[2],
    });
  }

    limpiarFiltros() {
  // Resetear el formulario
  this.formFilter.reset();
  console.log('Formulario después de resetear', this.formFilter.value);
        this.usuarioService.getAll().subscribe((data) => {
      this.usuarios = data;
      this.cargarTabla();
      this.loading = false;
      console.log("Los usuarios de la aplicación",this.usuarios);
    });
  }

  checkUniqueAdmin() {
    let contador = 0; // Contador para saber cuántos usuarios tienen el rolId específico

    this.usuarios.forEach(usuario => {
        if (usuario.roles.some(rol => rol.id === 1)) { // Verifica si alguno de los roles del usuario tiene el id especificado
            contador++;
        }
    });

    return contador === 1; // Retorna true si exactamente uno tiene el rolId, sino false
}

  // Verifica también resetear cualquier estado interno que pueda ser usado en las consultas del servicio


  /**
   * Método para la obtención de todos los usuarios filtrados por el formulario de filtraddo del template
   */
  filterUsuarios() {
    const filtros = {
      nombreUsuario: this.formFilter.get('nick').value,
      nombre: this.formFilter.get('nombreUsuario').value,
      email: this.formFilter.get('email').value,
      rolId: this.formFilter.get('rol').value
    };
    this.usuarioService.getAllFiilter(filtros).subscribe((data) => {
      this.usuarios = data;
      this.cargarTabla();
    })
  }
}
