/**
 @file Servicio que gestiona el token del usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = 'AuthToken';


@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los token de acceso a la aplicación
 **/
export class TokenService {
  roles: Array<string> = [];

  /**
   Constructor de la clase
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(private router:Router) { }

  /**
   Método que guarda el token de acceso en la memoria del navegador
   @param token {string} Token de acceso
   **/
  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   Método que obtiene el token de acceso guardado en el navegador
   @return {string | null} Token de acceso, si esta a nulo significa que no se ha iniciado sesión
   **/
  public getToken(): string|null{
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   Método que comprueba que el usuario tenga un token de acceso a la página web
   @return {boolean} Verdadero en caso de que exista el token, falso en caso de que no y el usuario no tenga sesión iniciada
   **/
  public isLogged():boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }

  /**
   Método que obtiene el nombre de usuario del token
   @return {string} Nombre de usuario extraido del token
   **/
  public getUserName(): string | null {
    if(!this.isLogged()){
      return null;
    }
    const token=this.getToken();
    // @ts-ignore
    const payload=token.split('.')[1];
    const payloadDecoded=atob(payload);
    const values=JSON.parse(payloadDecoded);
    const username=values.sub;
    return username;
  }

  /**
   Método que comprueba que el usuario que tiene sesión iniciada es administrador
   @return {boolean} Verdadero en caso de que el usuario tenga permisos de administrador, falso en caso de que no
   **/
  public getIsAdmin(): boolean {
    if(!this.isLogged()){
      return false;
    }
    const token=this.getToken();
    // @ts-ignore
    const payload=token.split('.')[1];
    const payloadDecoded=atob(payload);
    const values=JSON.parse(payloadDecoded);
    const roles=values.roles;
    if(roles.indexOf('ROLE_ADMIN')<0){
      return false;
    }
    return true;
  }

  getNombreApellidos() {
    if(!this.isLogged()){
      return null;
    }
    const token=this.getToken();
    // @ts-ignore
    let payload=token.split('.')[1];
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    // const payloadDecoded=atob(payload);
    const payloadDecoded = decodeURIComponent(window.atob(payload).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const values=JSON.parse(payloadDecoded);
    const nombre = values.nombre;
    const apellidos = values.apellidos;
    return nombre + ' ' + apellidos;
  }

  /**
   Método que destruye el token de acceso y cierra la sesión del usuario
   **/
  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/auth']);
  }

}
