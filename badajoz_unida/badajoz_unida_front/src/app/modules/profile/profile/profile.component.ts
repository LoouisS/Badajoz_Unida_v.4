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

  constructor(
    private _usuarioService: UsuariosService,
    private _idiomasService: IdiomasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private alertsService: AlertsService
  ) {}

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

  cargarFormulario(){
    this.formProfile.setValue({
      tlf: this.usuario?.telefono,
      email: this.usuario?.email,
      idiomaId: this.usuario?.idiomaId
    })
  }

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

  mostrarModalIntereses(){
    this.modalService.open(this.editarIntereses, {size: 'lg', backdrop: 'static'});
  }

  cerrarModalIntereses(){
    this.modalService.dismissAll(this.editarIntereses);
  }

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

}
