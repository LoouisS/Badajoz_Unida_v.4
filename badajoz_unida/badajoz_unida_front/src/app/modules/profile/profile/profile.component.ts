/**
 @file Contiene la vista del perfil del usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {IdiomasService} from "../../../services/idiomas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 Vista del perfil del usuario
 **/
export class ProfileComponent implements OnInit{

  formProfile: FormGroup;
  usuario: any;
  idiomas: any

  constructor(private _usuarioService: UsuariosService, private _idiomasService: IdiomasService, private formBuilder: FormBuilder) {
  }

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

}
