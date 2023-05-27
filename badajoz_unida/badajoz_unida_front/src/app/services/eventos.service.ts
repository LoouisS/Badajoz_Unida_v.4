/**
 @file Servicio que gestiona los datos de los eventos
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import * as dataEventos from './../data/eventos.json';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los datos de los eventos
 **/
export class EventosService {

  apiUrl='http://localhost:8080/eventos/';

  /**
   Constructor de la clase
   @param httpClient {HttpClient} Clase para realizar peticiones http
   **/
  constructor(private httpClient: HttpClient) { }

  getEventosByNovedad(){
    return this.httpClient.get(this.apiUrl + 'new');
  }

  getEventosById(id: number){
    return this.httpClient.get(this.apiUrl + id);
  }

  /**
   Método que guarda los datos de un evento en la base de datos
   @param formData {FormData} Datos del formulario de creación de eventos
   @return {Observable} Resultado de la petición POST
   **/
  createEvento(formData: FormData){
    return this.httpClient.post(this.apiUrl+'save',formData)
  }

  /**
   Método que obtiene los datos de todos los eventos registrados
   @return {Observable} Resultado de la petición GET
   **/
  getAllEventos(){
    return this.httpClient.get(this.apiUrl+'all')
  }

  /**
   * Métodos para la obtención de eventos filtrados por parámetros
   * @param filtros
   */
  getEventosFiltered(filtros:any) {
    return this.httpClient.post(this.apiUrl+'allFilter',filtros)
  }
  deleteEventById(id: number){
    return this.httpClient.delete(this.apiUrl+'delete/'+id);
  }
}
