/**
 @file Servicio que gestiona los datos del usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los datos del usuario
 **/
export class UsuariosService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);

  apiUrl: string ='http://localhost:8080/usuarios/';
  constructor(private httpClient: HttpClient) { }

  /**
   * Método para la obtención de datos asociados a un usuario
   */
  getDatosUsuario(){
    return this.httpClient.get(this.apiUrl + "datos");
  }

  setUser(user: any) {
    this.user.next(user);
  }

  getUser() {
    return this.user.asObservable();
  }

  /**
   * Método para el envío de los datos actualizados de un usuario a registrar en la aplicación
   * @param datos
   */
  saveChanges(datos: any){
    return this.httpClient.post(this.apiUrl + "save", datos)
    .pipe(
      tap(saveChanges => {
        this.user.next(saveChanges);
      })
    );;
  }

  /**
   * Método para el envío de la actualización de intereses de un usuario
   * @param intereses
   */
  changeIntereses(intereses: any[]){
    return this.httpClient.put(this.apiUrl + "saveIntereses", intereses);
  }

  /**
   * Método para la obtención de todos los usuarios registrados en la aplicación
   */
  getAll(){
    return this.httpClient.get(this.apiUrl + "getAll");
  }

  /**
   * Método para el cambio de rol de un usuario en la aplicación
   * @param number
   */
  cambioRol(id:number,number: number) {
    const userPrivilegio = {
      id: id,
      rol: number
    }
    return this.httpClient.post(this.apiUrl + "updateRol",userPrivilegio);
  }

  /**
   * Método para el envío de los valores a filtrar para la obtención de usuarios filtrados
   * @param filtros
   */
  getAllFiilter(filtros: any ) {
    return this.httpClient.post(this.apiUrl + 'getAllFilter',filtros);
  }

  /**
   * Método para eliminar un usuario de la aplicación
   * @param param
   */
  deleteUser(id: number) {
    console.log("EL ID A ELIMINAR", id);
    return this.httpClient.delete(this.apiUrl + 'deleteUser/'+id);
  }
}
