import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IdiomasService} from "../../../services/idiomas.service";
import {AuthService} from "../../../security/services/auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit{

  forma!: FormGroup;
  // modal = new ModalComponent();
  idiomas: any[] = [];
  categorias: any[] = []
  formIntereses: boolean = false;
  interesesList: any[] = [];
  interesesSelected: any[] = [];
  addIntereses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  removeIntereses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    // private appService: AppService,
    private _idiomasService: IdiomasService,
    private router: Router
  ) {}

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.idiomas = this._idiomasService.getIdiomas();
    this.categorias = this.getCategoriasAndIntereses();
    console.log(this.categorias);
    this.addIntereses.subscribe((data: any) => {
      for(let interes of data){
        this.interesesList.push(interes);
      }
    })
    this.removeIntereses.subscribe((data: any) => {
      this.interesesList = data;
    });
  }

  /**
   * Añade los validadores del formulario.
   */
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-ZÀ-ÿ\u00f1\u00d1]{4,30})(\s{0,1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,29}){0,1}$/
          ),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([a-zA-ZÀ-ÿ\u00f1\u00d1]){4,30})(\s{0,1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,29}){0,1}$/
          ),
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
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/
          ),
        ],
      ],
      password2: ['', [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      usuario: ['', [Validators.required]],
      idioma: [-1, [Validators.required]]
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
      this.formIntereses = false;
      Object.values(forma.controls).forEach((control) => {
        if (control instanceof FormGroup) this.guardar(control);
        control.markAsTouched();
      });

      return;
    }
    // this.registro(forma);
  }

  /**
   * Llama a la API para dar de alta a un usuario.
   * @param loginForm - Campos del formulario
   */
  // registro(loginForm: FormGroup) {
  //   let datos = loginForm.value;
  //   datos.tipo = 'registro';
  //   this.appService.postQuery(datos).subscribe(
  //     (data) => {
  //       if (data['status'] != 'error') {
  //         this.modal.generateModal(
  //           'Éxito',
  //           `Cuenta creada con éxito.`,
  //           'De acuerdo',
  //           'success'
  //         );
  //         setTimeout(() => {
  //           this.router.navigate(['login']);
  //         }, 2000);
  //       } else {
  //         this.modal.generateModal(
  //           'Algo salió mal',
  //           `${data['result']['error_msg']}`,
  //           'De acuerdo',
  //           'error'
  //         );
  //       }
  //     },
  //     async (errorServicio) => {
  //       console.log('he fallado');
  //       console.log(errorServicio);
  //       //this.toast=true;
  //     }
  //   );
  // }

  /**
   * Valida que un campo del formulario sea correcto.
   * @param campo1 - Valor del campo
   * @returns - Campo válido y no enfocado
   */
  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  /**
   * Verifica que ambas contraseñas coincidan.
   */
  get comprobarPasswords() {
    let pass1 = this.forma.get('password')?.value;
    let pass2 = this.forma.get('password2')?.value;
    return pass1 === pass2 ? true : false;
  }

  /**
   * Comprueba que el usuario sea mayor de 16 años.
   */
  get comprobarEdad() {
    if (this.forma.get('fechaNacimiento') != null) {
      let fechaNacimiento = this.forma.get('fechaNacimiento')?.value;
      let convertirFecha = new Date(fechaNacimiento).getTime();
      let timeDiff = Math.abs(Date.now() - convertirFecha);
      let edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      return edad >= 16 ? true : false;
    }
    return true;
  }

  /**
   * Permite visualizar tu contraseña
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
  /**
   * @ignore
   */
  showHide2() {
    const input = <HTMLInputElement>document.getElementById('iPasswordRepeat');
    const i = <HTMLInputElement>document.getElementById('ieye2');
    if (input.type === 'password') {
      input.type = 'text';
      i.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
      input.type = 'password';
      i.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
  }

  goToLogin(){
    this.router.navigate(['/auth', '/login'])
  }

  goToIntereses(){
    this.formIntereses = true;
  }

  goToRegistro(){
    this.formIntereses = false
  }

  getCategoriasAndIntereses(){
    return this._authService.getCategorias();
  }

  selectCategoria(categoria: any){
    categoria.activo = categoria.activo ? false : true;
    if(categoria.activo){
      this.addInteresesFromCategoria(categoria.id);
    } else {
      this.removeInteresesFromInteresesList(categoria.id);
    }
  }

  addInteresesFromCategoria(categoriaId: number){
    for(let categoria of this.categorias){
      if(categoriaId == categoria.categoria.id){
        this.addIntereses.next(categoria.intereses);
      }
    }

  }

  removeInteresesFromInteresesList(categoriaId: number){
    let nuevosIntereses: any[] = [];
    for(let interes of this.interesesList){
      if(interes.categoria_id != categoriaId){
        nuevosIntereses.push(interes);
      }
    }
    this.removeIntereses.next(nuevosIntereses);
  }

  selectInteres(interes: any){
    interes.activo = interes.activo ? false : true;
    if(interes.activo){
      this.interesesSelected.push(interes.id);
    } else {
      this.interesesSelected.splice(this.interesesSelected.indexOf(interes.id), 1);
    }
    console.log(this.interesesSelected);
  }

}
