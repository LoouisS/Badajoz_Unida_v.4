/**
 @file Contiene la vista del formulario de registro
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/


import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IdiomasService} from "../../../services/idiomas.service";
import {AuthService} from "../../../security/services/auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {NuevoUsuario} from "../../../security/models/auth/nuevo-usuario";
import {CategoriasService} from "../../../services/categorias.service";
import {ValidadoresService} from "../../../services/validadores.service";
import Swal from 'sweetalert2'
import { LocalizedComponent } from 'src/app/config/localize.component';
import { MessageService } from 'primeng/api';
import { ValidadorService } from 'src/app/services/validators/validador-service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})

/**
 Vista del formulario de registro
 **/
export class FormRegisterComponent extends LocalizedComponent implements OnInit, OnDestroy {

  forma!: FormGroup;
  // modal = new ModalComponent();
  idiomas: any[] = [];
  categorias: any[] = [];
  formIntereses: boolean = false;
  interesesList: any[] = [];
  interesesSelected: any[] = [];
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
  addIntereses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  removeIntereses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   Constructor de la clase
   @param formBuilder {FormBuilder} Clase para construir los formularios reactivos,
   @param _authService {AuthService} Servicio que gestiona los métodos referentes al login y registro,
   @param _categoriaService {CategoriasService} Servicio que gestiona los datos de las categorias,
   @param _idiomasService {IdiomasService} Servicio que gestiona los datos de los idiomas,
   @param _validadorService {ValidadoresService} Servicio que proporciona validaciones personalizadas,
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private _authService: AuthService,
    private _categoriaService: CategoriasService,
    private _idiomasService: IdiomasService,
    private _validadorService: ValidadoresService,
    private _asyncValidator: ValidadorService,
    private router: Router
  ) {
    super();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit(): void {
    this._authService.changeAuthMessage(true);
    this.crearFormulario();
    this._idiomasService.getIdiomas().subscribe((data: any) => {
      this.idiomas = data;
    });
    this.getCategoriasAndIntereses().subscribe((data: any) => {
      this.categorias = data;
      console.log(this.categorias);
      for(let categoria of this.categorias){
        for(let interes of categoria.intereses){
          interes.categoria_id = categoria.categoriaId
          switch (interes.categoria_id){
            case 1:
              interes.emoji = '⚽';
              break;
            case 2:
              interes.emoji = '🎭';
              break;
            case 3:
              interes.emoji = '🎵';
              break;
            case 4:
              interes.emoji = '🍲';
              break;
            case 5:
              interes.emoji = '📚';
              break;
            default:
              interes.emoji = '🔥';
          }
          this.interesesList.push(interes);
        }
      }
      this.interesesList.sort(this.compareRandom);
    });
    // this.addIntereses.subscribe((data: any) => {
    //   for(let interes of data){
    //     this.interesesList.push(interes);
    //   }
    // })
    // this.removeIntereses.subscribe((data: any) => {
    //   this.interesesList = data;
    // });
    console.log(this.interesesList)
    console.log(this.forma);
  }

  /**
   Método que destruye la vista
   **/
  ngOnDestroy() {
    for(let interes of this.interesesList){
      interes.activo = false;
    }
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
  /^$|^([a-zA-ZÀ-ÿ\u00f1\u00d1]+)(\s{0,1}[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/
)

        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([a-zA-ZÀ-ÿ\u00f1\u00d1]){2,30})(\s{0,1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,29}){0,1}$/
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
      fechaNacimiento: [null, [Validators.required, this._validadorService.comprobarEdad]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      usuario: ['',
    [Validators.required, Validators.pattern(/^[a-zA-zA-Z0-9À-ÿ\u00f1\u00d1]{3,}$/)],
    [this._asyncValidator.usuarioExiste()]  // Añadido como validador asíncrono
  ],
      idioma: [-1, [Validators.required, this._validadorService.comprobarIdioma]]
    }, {validators:this._validadorService.passwordsIguales('password', 'password2')});
  }
  /**
   Comprueba que todos los campos introducidos sean correctos.
   @param forma {FormGroup} Campos del formulario
   @returns - void
   **/
  guardar(forma: FormGroup) {
    if (forma.invalid || forma.pending) {
      this.formIntereses = false;
      Object.values(forma.controls).forEach((control) => {
        if (control instanceof FormGroup) this.guardar(control);
        control.markAsTouched();
      });
      return;
    }
  this.alert.fire({
    title: `${this.resources.sureContinue}`,
    text: `${this.resources.sureContinueDetail}`,
        html: `<ul class="list-group list-group-flush d-flex">
            <li class="list-group-item text-left">${this.resources.offName}: ${this.forma.get('nombre')?.value}</li>
            <li class="list-group-item text-left">${this.resources.surname}: ${this.forma.get('apellidos')?.value}</li>
            <li class="list-group-item text-left">Email: ${this.forma.get('email')?.value}</li>
            <li class="list-group-item text-left">${this.resources.birth}: ${this.forma.get('fechaNacimiento')?.value}</li>
            <li class="list-group-item text-left">${this.resources.phone}: ${this.forma.get('telefono')?.value}</li>
            <li class="list-group-item text-left">${this.resources.username}: ${this.forma.get('usuario')?.value}</li>
            <li class="list-group-item text-left">${this.resources.lang}: ${this.forma.get('idioma')?.value}</li>
         </ul>`,
  icon: 'question',
    showConfirmButton: true,
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      this.registro(forma);
    } else {
          this.messageService.add({
            severity: 'info',
            summary:`${this.resources.eventCreationCancelled}`,
            detail: `${this.resources.eventCreationCancelledDetail}`
          });
    }
  })

  }

  /**
   Llama a la API para dar de alta a un usuario.
   @param registroForm {FormGroup} Campos del formulario
   **/
  registro(registroForm: FormGroup) {
    // let datos = loginForm.value;
    // datos.tipo = 'registro';
    let controles:any = Object.keys(this.forma.controls);
    let datos:any = {};
    Object.values(this.forma.controls).forEach((control, index) => {
      if(controles[index] != "password2"){
        datos[controles[index]] = control.value;
      }
    });

    let user: NuevoUsuario = new NuevoUsuario(datos.nombre, datos.apellidos, datos.usuario, datos.email, datos.password, datos.telefono, datos.fechaNacimiento, datos.idioma);
    user.intereses = this.interesesSelected;
    this._authService.nuevo(user).subscribe(
      (data: any) => {
        if (data['status'] != 'error') {
          this.messageService.add({
            severity: 'success',
            summary:`${this.resources.registerCompleted}`,
            detail: `${this.resources.registerCompletedDetail}`,
          });
         setTimeout(() => {
           this.router.navigate(['/auth']);
         }, 1000);
        }
      },
      async (errorServicio: any) => {
        console.log('he fallado');
        console.log(errorServicio);
        this.messageService.add({
          severity: 'error',
          summary:`${this.resources.registerError}`,
          detail:`${this.resources.userExists}`,
        });
      }
    );
  }

  /**
   Valida que un campo del formulario sea correcto.
   @param campo1 {string} Valor del campo
   @returns - Campo válido y no enfocado
   **/
  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  /**
   Verifica que ambas contraseñas coincidan.
   **/
  comprobarPasswords() {
    // let pass1 = this.forma.get('password')?.value;
    // let pass2 = this.forma.get('password2')?.value;
    // return pass1 === pass2 ? true : false;
    let errorComprobarPass = this.forma?.get('password2')?.errors;
    if(errorComprobarPass){
      if(errorComprobarPass['noEsIgual'] && this.forma?.get('idioma')?.touched){
        return true;
      }
    }
    return false;
  }

  /**
   Comprueba que el usuario sea mayor de 16 años.
   **/
  comprobarEdad() {
    let errorEdad = this.forma?.get('fechaNacimiento')?.errors;
    if(errorEdad){
      if(errorEdad['menor16'] && this.forma?.get('idioma')?.touched){
        return true;
      }
    }
    return false;
  }

  /**
   Comprueba que el idioma sea valido.
   **/
  comprobarIdioma(){
    return this.forma.get('idioma')?.value == -1 && this.forma.get('idioma')?.touched ? true : false;
  }

  /**
   Permite visualizar tu contraseña
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
   @ignore
   **/
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

  /**
   Cambia al formulario de login
   **/
  goToIntereses(){
    this.formIntereses = true;
  }

  /**
   Carga los datos de las categorías y los intereses
   @return {Observable} Colección de datos con las categorias e intereses disponibles
   **/
  getCategoriasAndIntereses(){
    return this._categoriaService.getCategorias();
  }

  // selectCategoria(categoria: any){
  //   categoria.activo = categoria.activo ? false : true;
  //   if(categoria.activo){
  //     this.addInteresesFromCategoria(categoria.id);
  //   } else {
  //     this.removeInteresesFromInteresesList(categoria.id);
  //   }
  // }

  // addInteresesFromCategoria(categoriaId: number){
  //   for(let categoria of this.categorias){
  //     if(categoriaId == categoria.categoria.id){
  //       this.addIntereses.next(categoria.intereses);
  //     }
  //   }
  //
  // }

  // removeInteresesFromInteresesList(categoriaId: number){
  //   let nuevosIntereses: any[] = [];
  //   for(let interes of this.interesesList){
  //     if(interes.categoria_id != categoriaId){
  //       nuevosIntereses.push(interes);
  //     }
  //   }
  //   this.removeIntereses.next(nuevosIntereses);
  // }

  /**
   Selecciona el interes marcado por el usuario
   **/
  selectInteres(interes: any){
    interes.seleccionado = interes.seleccionado ? false : true;
    if(interes.seleccionado){
      this.interesesSelected.push({"interesId": interes.interesId});
    } else {
      this.interesesSelected.splice(this.interesesSelected.indexOf({"interesId": interes.interesId}), 1);
    }
  }

  /**
   Verifica que el formulario no sea invalido
   **/
  verificarFormulario(){
    if (this.forma.invalid) {
      return true;
    }
    return false;
  }

  /**
   Realiza un ordenamiento aleatorio
   **/
  compareRandom(a: any, b: any) {
    return Math.random() - 0.5;
  }

  /**
   Cambia al formulario de login
   **/
  goToLogin(){
    this._authService.goToLogin();
  }

}
