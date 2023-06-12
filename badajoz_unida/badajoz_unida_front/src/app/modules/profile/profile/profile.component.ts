/**
 @file Contiene la vista del perfil del usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {IdiomasService} from "../../../services/idiomas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertsService} from "../../../services/alerts.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 Vista del perfil del usuario
 **/
export class ProfileComponent implements OnInit{

  @ViewChild('editarIntereses') editarIntereses: TemplateRef<any>;
  formProfile: FormGroup;
  usuario: any;
  idiomas: any
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
    private alertsService: AlertsService
  ) {}

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.crearFormulario();
    this._usuarioService.getDatosUsuario().subscribe((data: any) => {
      this.usuario = data;
      this.cargarFormulario();
    })
    this._idiomasService.getIdiomas().subscribe((data: any) => {
      this.idiomas = data;
    })
  }

  /**
   Método que inicializa el formulario reactivo
   **/
  crearFormulario() {
    this.formProfile = this.formBuilder.group({
      tlf: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9)
        ],
      ],
      idiomaId: [
        null,
        [
          Validators.required
        ],
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.pattern(
            /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
          ),
        ],
      ]
    });
  }

  /**
   Método que carga los datos en el formulario
   **/
  cargarFormulario(){
    this.formProfile.setValue({
      tlf: this.usuario?.telefono,
      email: this.usuario?.email,
      idiomaId: this.usuario?.idiomaId
    })
  }

  /**
   Método que guarda los cambios en los datos del usuario
   @param formProfile {FormBuilder} Datos del formulario reactivo
   **/
  async cambiarDatosUsuario(formProfile: FormGroup){
    let respuesta = await this.alertsService.askConfirmation('Guardar cambios', '¿Estas seguro de querer guardar estos cambios?');
    if(respuesta){
      let controles:any = Object.keys(this.formProfile.controls);
      let datos:any = {};
      Object.values(this.formProfile.controls).forEach((control, index) => {
        if(controles[index] == "idiomaId"){
          datos.idioma = { idiomaId: control.value };
        }
        datos[controles[index]] = control.value;
      });
      // console.log(datos);
      this._usuarioService.saveChanges(datos).subscribe((data: any) => {
        this.alertsService.showSuccessAlert('Guardar cambios', 'Cambios guardados exitosamente');
      }, error => {
        this.alertsService.showInfoAlert('Guardar cambios', 'No se han podido guardar los cambios');
      });
    }
  }

  /**
   Método que muestra el modal para modificar intereses
   **/
  mostrarModalIntereses(){
    this.modalService.open(this.editarIntereses, {size: 'lg', backdrop: 'static'});
  }

  /**
   Cerrar el modal de modificación de intereses
   **/
  cerrarModalIntereses(){
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
    this.alert.fire({
      title: "¿Seguro que deseas eliminar tu cuenta?",
      text: "Tu cuenta se eliminará de forma permanente en la aplicación"
    }).then((result) => {
      if (result.isConfirmed) {
        this.alert.fire({
          title: 'Espere mientras procesamos su solicitud',
          didOpen(popup: HTMLElement) {
            Swal.showLoading();
          }
        })
        this._usuarioService.deleteUser(userId).subscribe((data) => {
          this.alert.fire({
            title: 'Eliminado con éxito!',
            text: 'Tu cuenta ha sido eliminada correctamente, deseamos volver a contar contigo cuando quieras.',
            icon: 'success',
            timer: 4000,
            showConfirmButton: false,
            showCancelButton: false,
          });
        })
      }
    });
  }
}
