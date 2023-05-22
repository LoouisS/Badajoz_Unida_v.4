/**
 @file Servicio relacionado a los procesos de login y registro
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {LoginUsuario} from "../../models/auth/login-usuario";
import {BehaviorSubject, Observable} from "rxjs";
import {NuevoUsuario} from "../../models/auth/nuevo-usuario";
import {HttpClient} from "@angular/common/http";
import {JwtDto} from "../../models/auth/jwt-dto";
import {Model} from "../../../models/model.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los métodos de los procesos de login y registro
 **/
export class AuthService {

  isFormRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authURL = 'http://localhost:8080/auth/';
  modelo: Model = new Model();

  /**
   Constructor de la clase
   @param httpClient {HttpClient} Clase para realizar peticiones http,
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  /**
   Método que envia los datos para registrar un nuevo usuario
   @param nuevoUsuario {NuevoUsuario} Datos registrados del usuario
   @return {Observable} Resultado de la petición
   **/
  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    console.log(nuevoUsuario);
    return this.httpClient.post<any>(this.authURL + 'register', nuevoUsuario);
  }

  /**
   Método que envia los datos introducidos por el usuario para su verificación
   @param loginUsuario {LoginUsuario} Datos introducidos por el usuario para realizar el login
   @return {Observable} Resultado de la petición
   **/
  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);

  }

  /**
   Método que refresca el token si el usuario sigue activo en la web
   @param dto {JwtDto} Token de autenticación
   @return {Observable} Resultado de la petición
   **/
   public refresh(dto: JwtDto): Observable<JwtDto> {
     return this.httpClient.post<JwtDto>(this.authURL + 'refresh', dto);
   }

  /**
   Método que indica el formulario que esta mostrando la vista
   @param isFormRegister {boolean} Indica si el formulario que se muestra es el formulario de registro
   **/
  public changeAuthMessage(isFormRegister: boolean){
    this.isFormRegister.next(isFormRegister);
  }

  /**
   Método que envia el dato de que formulario se esta mostrando en pantalla
   @return {Observable} Booleano que indica que formulario se muestra en la vista
   **/
  public getAuthMessage(){
    return this.isFormRegister;
  }

  /**
   Cambia al formulario de registro
   **/
  goToRegistro(){
    this.router.navigate(['/auth/registro']);
  }

  /**
   Cambia al formulario de login
   **/
  goToLogin(){
    this.router.navigate(['/auth/login']);
  }

}
