/**
 @file Servicio que gestiona los datos de las categorias
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
 Servicio que gestiona los datos de las categorias
 **/
export class CategoriasService {

  authURL = 'http://localhost:8080/categorias/';
  editCategoria: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  create: boolean = true;


  /**
   Constructor de la clase
   @param httpClient {HttpClient} Clase para realizar peticiones http
   **/
  constructor(private httpClient: HttpClient) { }

  /**
   Método que obtiene la colección de datos de todas las categorías disponibles
   @return {Observable} Resultado de la petición GET
   **/
  public getCategorias(){
    return this.httpClient.get(this.authURL + 'all');
  }

  /**
   * Método para la obtención de todas las categorías registradas
   */
  getIntereses() {
    return this.httpClient.get(this.authURL + 'interesesAll');
  }

  /**
   * Método para el registro de una nueva categoría
   * @param categoria
   */
  registrarCategoria(categoria: any, create:boolean){
    // Configura los parámetros de la solicitud
    const params = new HttpParams().set('create', create.toString());  // Asume que `create` es un booleano

    console.log(categoria);
    // Realiza la solicitud HTTP POST
    return this.httpClient.post(this.authURL + 'registrarCategoria', categoria, { params });
  }

  /**
   * Método para el borrado de una categoría
   * @param id
   */
  eliminarCategoria(id: number){
    return this.httpClient.delete(this.authURL + 'eliminarCategoria/' + id);
  }

  /**
   * Método para el almacenamiento de una categoria en el observable editCategoria
   * @param categoria
   */
  setEditCategoria(categoria: any){
    this.editCategoria.next(categoria);
    this.create = false;
  }

  /**
   * Método para la obtención de la información registrada en el observable de editCategoria
   */
  getEditCategoria(){
    return this.editCategoria;
  }

  /**
   * Método para eliminar los registros almacenados en el observable editCategoria
   */
  deleteEditCategoria(){
    this.editCategoria.next(null);
  }

  /**
   * Método para la obtención de las categorias filtradas por los parámetros de búsqueda
   * @param filtros
   */
  getCategoriasFiltered(filtros:any) {
    return this.httpClient.post(this.authURL + 'getAllFilter',filtros);
  }
}
