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

  constructor(private _usuarioService: UsuariosService, private _idiomasService: IdiomasService, private formBuilder: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.crearFormulario();
    this._usuarioService.getDatosUsuario().subscribe((data: any) => {
      this.usuario = data;
      this.cargarFormulario();
      console.log("EL USUARIO", this.usuario);
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

  cambiarDatosUsuario(formProfile: FormGroup){
    let controles:any = Object.keys(this.formProfile.controls);
    let datos:any = {};
    Object.values(this.formProfile.controls).forEach((control, index) => {
      if(controles[index] == "idiomaId"){
        datos.idioma = { idiomaId: control.value };
      }
      datos[controles[index]] = control.value;
    });
    // console.log(datos);
    this._usuarioService.saveChanges(datos).subscribe((data: any) => {});
  }

  mostrarModalIntereses(){
    this.modalService.open(this.editarIntereses, {size: 'lg', backdrop: 'static'});
  }

  cerrarModalIntereses(){
    this.modalService.dismissAll(this.editarIntereses);
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
