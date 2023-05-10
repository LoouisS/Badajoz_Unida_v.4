import {Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../security/services/auth/auth.service";
import {LoginUsuario} from "../../../security/models/auth/login-usuario";
import {TokenService} from "../../../security/services/auth/token.service";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit{

  loginForm!: FormGroup;
  showAlert: boolean = false;
  // modal = new ModalComponent();
  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    // private appService: AppService,
    private _authService: AuthService,
    private _tokenService: TokenService,
    private router: Router,
    // private usuarioService: UsuarioService
  ) {
    // this.usuarioService.removeSesionActual();

  }


  /**
   * @ignore
   */
  ngOnInit(): void {
    this._authService.changeAuthMessage(false);
    this.crearFormulario();
  }
  /**
   * Añade los validadores del formulario.
   */
  crearFormulario() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * Comprueba que todos los campos introducidos sean correctos.
   *
   * @param forma - Campos del formulario
   * @returns - void
   */
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
   * Valida que un campo del formulario sea correcto.
   * @param campo1 - Valor del campo
   * @returns - Campo válido y no enfocado
   */
  validar(campo1: string) {
    let campo: any = this.loginForm.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  /**
   * Hace una llamada a la API para validar que el usuario exista y los datos sean correctos.
   *
   * @param loginForm - Campos del formulario
   */
  ComprobarUsuario(loginForm: FormGroup) {
    let usuario:any = this.loginForm.get('user')?.value;
    let clave:any = this.loginForm.get('password')?.value;
    let user: LoginUsuario = new LoginUsuario(usuario, clave);
    this._authService.login(user).subscribe(
      (data) => {
        this._tokenService.setToken(data.token);
        console.log("Se ha iniciado sesión exitosamente");
        this.router.navigate(['/']);
        this.showAlert = false;
      },
      async (errorServicio) => {
        this.showAlert = true;
        console.log('fallo al conectar con el servidor');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Permite visualizar tu contraseña.
   */
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

}
