/**
 @file Contiene la vista del formulario de login
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../security/services/auth/auth.service";
import {LoginUsuario} from "../../../security/models/auth/login-usuario";
import {TokenService} from "../../../security/services/auth/token.service";
import Swal from "sweetalert2";
import { LocalizedComponent } from 'src/app/config/localize.component';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})

/**
 Vista del formulario de login
 **/
export class FormLoginComponent extends LocalizedComponent implements OnInit{

  loginForm!: FormGroup;
  showAlert: boolean = false;
  verificandoLogin: boolean = false;
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
  // modal = new ModalComponent();

  /**
   Constructor de la clase
   @param formBuilder {FormBuilder} Clase para construir los formularios reactivos,
   @param _authService{AuthService} Servicio que gestiona los métodos referentes al login y registro,
   @param _tokenService {TokenService} Servicio que gestiona el token de identificación
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(
    private formBuilder: FormBuilder,
    // private appService: AppService,
    private _authService: AuthService,
    private _tokenService: TokenService,
    private router: Router,
    // private usuarioService: UsuarioService
  ) {
    super();
    // this.usuarioService.removeSesionActual();

  }


  /**
   Método que inicializa la vista
   **/
  ngOnInit(): void {
    this._authService.changeAuthMessage(false);
    this.crearFormulario();
  }

  /**
   Método que inicializa el formulario reactivo
   **/
  crearFormulario() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   Comprueba que todos los campos introducidos sean correctos.
   @param forma - Conjunto de campos que hacen parte del formulario
   @returns - void
   **/
  guardar(forma: FormGroup) {
    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach((control) => {
        if (control instanceof FormGroup) this.guardar(control);
        control.markAsTouched();
      });
      return;
    }
    this.ComprobarUsuario(forma);
  }

  /**
   Hace una llamada a la API para validar que el usuario exista y los datos sean correctos.
   @param loginForm {FormGroup} Conjunto de campos que hacen parte del formulario
   **/
  ComprobarUsuario(loginForm: FormGroup) {
    let usuario:any = this.loginForm.get('user')?.value;
    let clave:any = this.loginForm.get('password')?.value;
    let user: LoginUsuario = new LoginUsuario(usuario, clave);
    this.verificandoLogin = true;
    this._authService.login(user).subscribe(
      (data) => {
        this._tokenService.setToken(data.token);
        console.log("Se ha iniciado sesión exitosamente");
        this.router.navigate(['/']);
        this.showAlert = false;
        this.verificandoLogin = false;
      },
      async (errorServicio) => {
        this.verificandoLogin = false;
        this.showAlert = true;
        this.alert.fire({
          title: 'Ha ocurrido un problema',
          text: errorServicio.error,
          icon: 'error',
          timer: 4000,
          showConfirmButton: false,
          showCancelButton: false,
        })
        console.log('fallo al conectar con el servidor');
        console.log(errorServicio);
      }
    );
  }

  /**
   Permite visualizar la contraseña introducida en el campo.
   **/
  showHide() {
    const input = <HTMLInputElement>document.getElementById('iPassword');
    const i = <HTMLInputElement>document.getElementById('ieye');
    if (input.type === 'password') {
      input.type = 'text';
      i.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
      input.type = 'password';
      i.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
  }

  /**
   Cambia al formulario de registro
   **/
  goToRegistro(){
    this._authService.goToRegistro();
  }

}
