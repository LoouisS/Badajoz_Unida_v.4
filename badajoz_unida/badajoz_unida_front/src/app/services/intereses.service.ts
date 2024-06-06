/**
 @file Servicio de los datos de los intereses
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los datos los datos de los intereses
 **/
export class InteresesService {

  apiUrl: string ='http://localhost:8080/intereses/';
  editInteres: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  create: boolean = true;
  constructor(private httpClient: HttpClient) { }

  /**
   * Método para la obtención de todos los intereses existente en la aplicación
   */
  getAll(){
    return this.httpClient.get(this.apiUrl+'getAll');
  }

  /**
   * Método para el registro de un nuevo interés
   * @param interes
   */
registrarInteres(interes: any, create: boolean) {
    // Configura los parámetros de la solicitud
    const params = new HttpParams().set('create', create.toString());  // Asume que `create` es un booleano

    console.log(create);

    // Realiza la solicitud HTTP POST
    return this.httpClient.post(this.apiUrl + 'save', interes, { params });
  }
  /**
   * Método para el almacenamiento de un interés en el observable editInteres
   * @param categoria
   */
  setEditInteres(categoria: any){
    this.editInteres.next(categoria);
    this.create = false;
  }

  /**
   * Método para la obtención de la información registrada en el observable de editInteres
   */
  getEditInteres(){
    return this.editInteres;
  }

  /**
   * Método para eliminar los registros almacenados en el observable editInteres
   */
  deleteEditInteres(){
    this.editInteres.next(null);
  }

  /**
   * Método para eliminar el registro de un interes
   * @param interesId
   */
  eliminarInteres(interesId: number) {
    return this.httpClient.delete(this.apiUrl+'delete/'+interesId);
  }

  /**
   * Método para la obtención de intereses filtrados
   * @param filtros
   */
  getInteresesFiltered(filtros: any) {
    return this.httpClient.post(this.apiUrl + 'getAllFilter',filtros);
  }
}
