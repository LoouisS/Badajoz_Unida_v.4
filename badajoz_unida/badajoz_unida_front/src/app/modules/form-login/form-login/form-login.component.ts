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
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MessageService } from 'primeng/api';

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
  showRegister: boolean = false;
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
    private messageService: MessageService,
    private userService: UsuariosService
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

  this.userService.getAll().subscribe((data: any[]) => {
    let nombreUsuario = this.loginForm.get('user')?.value; // Acceso al nombre de usuario ingresado
    let existeUsuario = data.some(user => user.nombreUsuario === nombreUsuario);

    if (!existeUsuario) {
      this.showRegister = true;
      this.showAlert = false;
      this.messageService.add({
        severity: 'error',
        summary:`${this.resources.loginError}`,
        detail:`${this.resources.userNotFound}`,
      });
      return; // Importante para evitar la ejecución de código adicional
    } else {
      // Procedemos con la verificación de login solo si el usuario existe
      this.verificandoLogin = true;
      this._authService.login(user).subscribe(
        (data) => {
          this._tokenService.setToken(data.token);
          this.router.navigate(['/']);
          this.showAlert = false;
          this.verificandoLogin = false;
          this.userService.getDatosUsuario().subscribe((data: any) => {
            const usuario = data;
            this.userService.setUser(usuario);
            console.log("Usuario", usuario);
          });
        },
        (errorServicio) => {
          this.verificandoLogin = false;
          this.showAlert = true;
            this.showRegister = false;
          this.messageService.add({
            severity: 'error',
            summary:`${this.resources.loginError}`,
            detail:`${this.resources.loginErrorDetail}`,
          });

        }
      );
    }
  });
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
