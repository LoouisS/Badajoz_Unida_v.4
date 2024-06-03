/**
 @file Contiene la vista del perfil del usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { IdiomasService } from '../../../services/idiomas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../services/alerts.service';
import Swal from 'sweetalert2';
import { LocalizedComponent } from 'src/app/config/localize.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

/**
 Vista del perfil del usuario
 **/
export class ProfileComponent extends LocalizedComponent implements OnInit {
  @ViewChild('editarIntereses') editarIntereses: TemplateRef<any>;
  formProfile: FormGroup;
  usuario: any;
  idiomas: any;
  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-light',
    },
    buttonsStyling: false,
  });
    allUsuarios: any;

  /**
   Constructor de la clase
   @param _usuarioService {UsuariosService} Servicio que gestiona los datos de los usuarios
   @param _idiomasService {IdiomasService} Servicio que gestiona los datos de los idiomas
   @param formBuilder {FormBuilder} Clase que gestiona el formulario reactivo
   @param modalService {NgbModal} Clase que gestiona las ventanas modales
   @param alertsService {AlertsService} Servicio que gestiona las alertas
   **/
  constructor(
    private _usuarioService: UsuariosService,
    private _idiomasService: IdiomasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private alertsService: AlertsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.crearFormulario();
    this._usuarioService.getDatosUsuario().subscribe((data: any) => {
      this.usuario = data;
      console.log(this.usuario);
      this.cargarFormulario();
    });
    this._idiomasService.getIdiomas().subscribe((data: any) => {
      this.idiomas = data;
    });
        this._usuarioService.getAll().subscribe((data) => {
      this.allUsuarios = data;
    });
  }


  /**
   Método que inicializa el formulario reactivo
   **/
  crearFormulario() {
    this.formProfile = this.formBuilder.group({
      tlf: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      idiomaId: [null, [Validators.required]],
      email: [
        '',
        [
          Validators.email,
          Validators.pattern(
            /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
          ),
        ],
      ],
    });
  }

  /**
   Método que carga los datos en el formulario
   **/
  cargarFormulario() {
    this.formProfile.setValue({
      tlf: this.usuario?.telefono,
      email: this.usuario?.email,
      idiomaId: this.usuario?.idiomaId,
    });
  }

  /**
   Método que guarda los cambios en los datos del usuario
   @param formProfile {FormBuilder} Datos del formulario reactivo
   **/
  async cambiarDatosUsuario(formProfile: FormGroup) {
    this.confirmationService.confirm({
      message: `${this.resources.saveMessage}`,
      header: `${this.resources.saveConfirmation}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-text p-button-text',
      rejectButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: `${this.resources.yes}`,
      rejectLabel: `${this.resources.no}`,
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        let controles: any = Object.keys(this.formProfile.controls);
        let datos: any = {};
        Object.values(this.formProfile.controls).forEach((control, index) => {
          if (controles[index] == 'idiomaId') {
            datos.idioma = { idiomaId: control.value };
          }
          datos[controles[index]] = control.value;
        });
        this._usuarioService.saveChanges(datos).subscribe(
          (data: any) => {
            this._usuarioService.setUser(datos);
            this.messageService.add({
              severity: 'success',
              summary: `${this.resources.changesSaved}`,
              detail: `${this.resources.saveInfo}`,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: `${this.resources.saveChanges}`,
              detail: `${this.resources.notSaveInfo}`,
            });
          },
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: `${this.resources.saveChanges}`,
          detail: `${this.resources.notSaveInfo}`,
        });
      },
    });
    // let respuesta = await this.alertsService.askConfirmation('Guardar cambios', '¿Estas seguro de querer guardar estos cambios?');
    // if(respuesta){
    //   let controles:any = Object.keys(this.formProfile.controls);
    //   let datos:any = {};
    //   Object.values(this.formProfile.controls).forEach((control, index) => {
    //     if(controles[index] == "idiomaId"){
    //       datos.idioma = { idiomaId: control.value };
    //     }
    //     datos[controles[index]] = control.value;
    //   });
    //   // console.log(datos);
    //   this._usuarioService.saveChanges(datos).subscribe((data: any) => {
    //     console.log(datos);
    //     this._usuarioService.setUser(datos);
    //     this.alertsService.showSuccessAlert('Guardar cambios', 'Cambios guardados exitosamente');
    //   }, error => {
    //     this.alertsService.showInfoAlert('Guardar cambios', 'No se han podido guardar los cambios');
    //   });
  }

  /**
   Método que muestra el modal para modificar intereses
   **/
  mostrarModalIntereses() {
    this.modalService.open(this.editarIntereses, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  /**
   Cerrar el modal de modificación de intereses
   **/
  cerrarModalIntereses() {
    this.modalService.dismissAll(this.editarIntereses);
  }

  /**
   Método de validaciones generales
   @param campo {string} Nombre del campo del formulario
   @return {string} texto de la validación
   **/
  validar(campo: string): string | null {
    const control = this.formProfile.get(campo);

    if (control.invalid && control.touched) {
      if (control.errors?.['required']) {
        return 'Este campo es requerido.';
      }

      if (control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `El valor mínimo es de ${minLength} caracteres.`;
      }

      if (control.errors?.['maxlength']) {
        const maxLength = control.errors['maxlength'].requiredLength;
        return `El valor máximo es de ${maxLength} caracteres.`;
      }

      // Validación adicional para el campo de nombreCat
      if (campo === 'email' && control.errors?.['pattern']) {
        return `El formato del correo electrónico debe ser ejemplo@ejemplo.com`;
      }

      // Validación adicional para el campo de descripcion
      if (campo === 'descripcion' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `La descripción debe tener al menos ${minLength} caracteres.`;
      }

      // Si no se encuentra ningún error específico, devuelve el mensaje genérico
      return 'El valor ingresado no es válido.';
    }

    return null;
  }

  /**
   * Método para eliminar una cuenta de un usuario
   * @param userId
   */
  eliminarCuenta(userId: number) {
    this.confirmationService.confirm({
      message: `${this.resources.deleteAccountMessage}`,
      header: `${this.resources.deleteAccountHeader}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptLabel: `${this.resources.yes}`,
      rejectLabel: `${this.resources.no}`,
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this._usuarioService.deleteUser(userId).subscribe((data) => {
            this.messageService.add({
              severity: 'success',
              summary: `${this.resources.accountDeleted}`,
              detail: `${this.resources.accountDeletedInfo}`,
            });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: `${this.resources.warning}`,
          detail: `${this.resources.accountNotDeleted}`,
        });
      },
    });
  }
  esAdminUnico() {
  if (!this.allUsuarios) {
    // Si los datos aún no están disponibles, puedes optar por una acción, como retornar false
    // o incluso mejor, deshabilitar el botón que depende de esta condición hasta que la información esté disponible.
    return false;
  }

  let adminCount = 0;
  let esAdmin = false;

  this.allUsuarios.forEach(usuario => {
    const tieneRolAdmin = usuario.roles.some(rol => rol.id === 1); // Verifica si el usuario tiene rol de admin
    if (tieneRolAdmin) {
      adminCount++; // Incrementa por cada admin encontrado
    }
    // Considera usar usuario.userId si el backend envía userId en lugar de id
    if (usuario.userId === this.usuario?.id && tieneRolAdmin) {
      esAdmin = true; // Verdadero si el usuario específico es admin
    }
  });

  return esAdmin && adminCount === 1; // Verdad si es admin y es el único admin
}

  infoAdmin(){
    this.messageService.add({
      severity: 'info',
      summary: `Atención!`,
      detail: `Eres el unico admin`,
    });
  }


}
